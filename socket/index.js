//Uvozimo Socket.io komponentu i podesavamo je za rad
const io = require("socket.io")(8900, {
    cors:{
        origin:"http://localhost:3000"
    }
});

//Niz konektovanih korisnika:
let users = [];

//Metoda za dodavanje user._id i socketId u niz konektovanih:
const addUser = (userId, socketId) => {
    //Ukoliko nismo registrovali ovog korisnika kao vec prijavljenog:
    const pr = users.find(user => user.userId === userId);
    if(!pr) {
        users.push({userId, socketId});
        // console.log('Dodali smo korisnika: ', users);
    }
}

//Metoda za izbacivanje user._id i socketId objekta iz niza nakon diskonektovanja sa servera:
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

//Metoda za preuzimanje korisnika:
const getUser = (userid) => {
    let data;
    for(let i = 0; i < users.length; i++) {
        if(users[i].userId === userid)
            data = users[i];
    }
    return data;
}


//Kada god stigne zahtev za "connection", odstampace se na
//konzoli obavestenje da je neko konektovan na nas server
io.on("connection", (socket) => {
    console.log("A user is connected!");

    //Nakon svakog konektovanja uzimamo userId i socketId, kako bi znali da li je neki korisnik prijavljen:
    //Nema smisla da korisnicima koji nisu tu osvezavamo poruke u realnom vremenu:
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
    })

    //Za slanje poruke:
    socket.on("sendMessage", ({senderId, receiverId, text, conversationId}) => {

        const user = users.filter((u) => u.userId === receiverId[0]);

        //Prosledjujemo joj poruku:
        if(user[0]) {
            const msg = {
                sender: senderId,
                text: text,
                conversationId: conversationId
            }
            
            io.to(user[0].socketId).emit('getMessage', {
                sender: senderId, 
                text: text, 
                conversationId: conversationId
            });
        }
        else {
            console.log('User is not connected!');
        }
    })

    //Prilikom diskonektovanja treba izbaciti objekat iz niza:
    socket.on("disconnect",() => {
        console.log("User disconnected!");
        removeUser(socket.id);
    })
});