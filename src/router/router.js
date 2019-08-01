import { createStackNavigator, createAppContainer } from 'react-navigation';
import cuciBaju from '../Containers/cuciBaju/cuciBaju';
import pembayaran from '../Containers/pembayaran/pembayaran';
import metodePembayaran from '../Containers/metodePembayaran/metodePembayaran';
import notaPembayaran from '../Containers/notaPembayaran/notaPembayaran';
import tungguKonfirmasi from '../Containers/tungguKonfirmasi/tungguKonfirmasi';
import driverBrangkat from '../Containers/driverBrangkat/driverBrangkat';
import login from '../Containers/LoginUser/LoginUser';


export default createAppContainer(createStackNavigator(
    {
        pembayaran,
        cuciBaju,
        driverBrangkat,
        tungguKonfirmasi,
        cuciBaju,
        metodePembayaran,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: 'red',
            }
        }
    }
));