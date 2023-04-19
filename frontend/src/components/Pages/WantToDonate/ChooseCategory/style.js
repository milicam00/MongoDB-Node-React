import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({

    root: {
        flexGrow: 1,
        backgroundColor: '#FEF7DC',
        display: 'flex',
        minHeight: '1000px'
      },
      tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
      },
}));