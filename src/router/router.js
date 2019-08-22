import { createStackNavigator, createAppContainer } from 'react-navigation';
import landingPage from '../Containers/landingPage/landingPage';
import cuciBaju from '../Containers/cuciBaju/cuciBaju';
import pembayaran from '../Containers/pembayaran/pembayaran';
import metodePembayaran from '../Containers/metodePembayaran/metodePembayaran';
import notaPembayaran from '../Containers/notaPembayaran/notaPembayaran';
import tungguKonfirmasi from '../Containers/tungguKonfirmasi/tungguKonfirmasi';
import driverBrangkat from '../Containers/driverBrangkat/driverBrangkat';
import signUp from '../Containers/signUp/signUp';
import login from '../Containers/login/login';
import catatanPembelian from '../Containers/catatanPembelian/catatanPembelian';
import editProfile from '../Containers/editProfile/editProfile';
// import fire from '../Containers/fire/fire';

export default createAppContainer(createStackNavigator(
    {
        // fire,
        landingPage,
        login,
        signUp,
        catatanPembelian,
        metodePembayaran,
        editProfile,
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
                color: '#2EC5CB',
            },
            headerTintColor: '#2EC5CB',
            headerStyle: {
                // backgroundColor: "#DAF2FB",
                // #EBF5FB
                
                backgroundColor: 'white',
                elevation: 5,
            }
        }
    }
));