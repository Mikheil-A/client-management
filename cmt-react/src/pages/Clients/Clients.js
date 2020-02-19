import React, {Component, Fragment} from 'react';
import './Clients.scss';
import {jsonServerInstance as axios} from '../../axios';
import {connect} from "react-redux";
import {addClient, addAccount, changeDrawerOpenState, changeDialogOpenState} from "../../redux/actions/actions";
import Grid from "../../components/Grid/Grid";
import GridHeader from "../../components/GridHeader/GridHeader";
import Drawer from '@material-ui/core/Drawer';
import DrawerContent from "../../components/DrawerContent/DrawerContent";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddOrEditClientDialog from "../../components/addOrEditClientDialog/addOrEditClientDialog";


class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isDrawerOpened: false,
      // clients: [],
      client: {}
    };
  }

  componentDidMount() {
    this.fetchClients();
  }


  fetchClients = () => {
    axios.get('/clients')
      .then(res => {
        // this.storeClientsToComponentLevelState(res);
        this.storeClientsToReduxStore(res);
      })
  };

  storeClientsToComponentLevelState = data => {
    this.setState({
      ...this.state,
      clients: data
    })
  };

  storeClientsToReduxStore = data => {
    this.props.addClient(data);
  };

  onDrawerToggle = (clickedRow) => {
    this.setState({
      ...this.state,
      client: clickedRow
      // isDrawerOpened: !this.state.isDrawerOpened
    });

    this.props.changeDrawerOpenState(!this.props.modals.drawerOpenState);
  };


  onDialogToggle = () => {
    // console.log(222, this.props);
    this.props.changeDialogOpenState(!this.props.modals.dialogOpenState);
  };


  render() {
    return (
      <Fragment>
        <GridHeader onDialogOpen={this.onDialogToggle}/>

        {this.props.clients.length > 0
          ? <Grid data={this.props.clients}
                  onDriverOpen={this.onDrawerToggle}
                  onDialogOpen={this.onDialogToggle}/>
          : null}

        {this.props.accounts.accounts.length > 0
          ? this.props.accounts.accounts.map(account => (
            <div key={account}>
              {account}
            </div>
          ))
          : null}


        <Drawer anchor="right" open={this.props.modals.drawerOpenState} onClose={this.onDrawerToggle}>
          <DrawerContent client={this.state.client}/>
        </Drawer>

        <Dialog onClose={this.onDialogToggle}
                // open={this.props.modals.dialogOpenState}>
                open={true}>
          <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
          <h1>this is a test dialog</h1>
          <AddOrEditClientDialog/>
        </Dialog>
      </Fragment>
    )
  }
}


// const mapStateToProps = null;
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    clients: state.clients,
    modals: state.modals
  };
};

const mapDispatchToProps = {
  addAccount: addAccount,
  addClient: addClient,
  changeDrawerOpenState: changeDrawerOpenState,
  changeDialogOpenState: changeDialogOpenState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients);
