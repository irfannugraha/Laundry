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
import Teks from '../Components/Teks/Teks';

export default createAppContainer(createStackNavigator(
    {
        landingPage,
        signUp,
        login,
        metodePembayaran,
        cuciBaju,
        driverBrangkat,
        pembayaran,
        tungguKonfirmasi,
        notaPembayaran,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'white',
            }
        }
    }
));