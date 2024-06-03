import { StyleSheet, Dimensions, PixelRatio } from 'react';

/* Valores constantes para ajustar el tamaño de la fuente */
const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

/* Lista de Estilos */
const styles = StyleSheet.create({
  appBar: {
    container: {
      backgroundColor: '#0B5345',
      flexDirection: 'row',
      // Eliminar paddingTop ya que `Constants.statusBarHeight` no está disponible
      paddingTop: 10,
    },
    scroll: {
      paddingBottom: 15,
    },
    text: {
      color: '#ECF0F1',
      paddingHorizontal: 26,
    },
    active: {
      color: '#2ECC71',
    },
  },

  sensors: {
    image: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    containerModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    centeredViewSensors: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    progressbarContainer: {
      height: 20,
      marginVertical: 20,
      padding: 5,
      flexDirection: 'row',
    },
    progressbarText: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: getFontSize(18),
      color: 'black',
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 20,
    },
    progressbarTextTitle: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      fontSize: getFontSize(22),
      color: 'black',
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 20,
    },
    spacerprogressbar: {
      height: 20,
    },
    pressLecturaButton: {
      backgroundColor: '#DDDDDD',
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
    },
    pressLecturaButtonText: {
      fontSize: getFontSize(20),
      color: '#000',
    },
    LecturaTextTitle: {
      fontSize: getFontSize(24),
      color: '#000',
      marginBottom: 20,
      textAlign: 'center',
    },
    data: {
      flexDirection: 'row',
    },
    dataSensor: {
      margin: 10,
    },
    tempmaceta: {
      backgroundColor: '#FF6347',
      borderRadius: 20,
      padding: 10,
      margin: 5,
    },
    humidmaceta: {
      backgroundColor: '#4682B4',
      borderRadius: 20,
      padding: 10,
      margin: 5,
    },
    dataText: {
      fontSize: getFontSize(20),
      color: '#FFF',
    },
    title: {
      fontSize: getFontSize(16),
      color: '#FFF',
    },
    closeButton: {
      backgroundColor: '#DDDDDD',
      padding: 10,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: getFontSize(20),
      color: '#000',
    },
  },
});

export default styles;
