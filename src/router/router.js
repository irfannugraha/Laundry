import { createStackNavigator, createAppContainer } from 'react-navigation';
import landingPage from '../Containers/+Ohers/landingPage/landingPage';
import cuciBaju from '../Containers/cuciBaju/cuciBaju';
import pembayaran from '../Containers/pembayaran/pembayaran';
import metodePembayaran from '../Containers/metodePembayaran/metodePembayaran';
import notaPembayaran from '../Containers/notaPembayaran/notaPembayaran';
import tungguKonfirmasi from '../Containers/tungguKonfirmasi/tungguKonfirmasi';
import driverBrangkat from '../Containers/driverBrangkat/driverBrangkat';
import signUp from '../Containers/+Ohers/signUp/signUp';
import login from '../Containers/+Ohers/login/login';
import catatanPembelian from '../Containers/+Ohers/catatanPembelian/catatanPembelian';
import editProfile from '../Containers/editProfile/editProfile';
import fire from '../Containers/fire/fire';

export default createAppContainer(createStackNavigator(
    {
        landingPage,
        login,
        signUp,
        catatanPembelian,
        editProfile,    
        metodePembayaran,
        cuciBaju,
        driverBrangkat,
        pembayaran,
        tungguKonfirmasi,
        notaPembayaran,
    },
    {
        defaultNavigationOptions: {

            headerTitleStyle: {
                fontSize: 15,
                color: 'white',
            },
            headerStyle: {
                // backgroundColor: "#DAF2FB",
                backgroundColor: '#00B869',
                elevation: 0,
                shadowOption: 0,

            }
        }
    }
));