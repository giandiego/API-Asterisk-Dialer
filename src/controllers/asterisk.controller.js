
const ami = new require('asterisk-manager')('5038', 'localhost', 'aulautil', 'aulautil123', true);
// En caso de cualquier problema de conectividad, trata de mantener la conexión
ami.keepConnected();

// Escuchar eventos AMI específicos para manejar respuestas o notificaciones
ami.on('managerevent', function (evt) {
  // Aquí puedes manejar eventos AMI específicos, si lo necesitas
  // console.log(evt);
  if (evt.event === 'ExtensionStatus') {
    console.log(`El anexo ${evt.exten} cambio su estado: ${evt.statustext}`);
  }

});

export const StatusApiBase = async (req, res) => {
  try {
    const s = req.body,
      i = s.Data;

    if (!i) {
      throw new Error("Arguments are missing in your query.");
    }

    res.json({
      success: true,
      message: `Estas Conectado a la consola de Asterisk`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something goes wrong retrieving the StatusApiBase",
    });
  }
};

export const amiDial = async (req, res) => {
  try {
    const { channel, context, exten, priority, variables } = req.body;

    // Realizar la acción originate para hacer la llamada
    ami.action({
      'action': 'originate',
      'channel': channel,
      'context': context,
      'exten': exten,
      'priority': priority,
      'variable': variables
    }, function (err, response) {
      if (err) {
        console.error('Error al realizar la llamada:', err);
        return res.status(500).json({ error: 'Error al realizar la llamada' });
      }

      // Respuesta exitosa
      console.log('Respuesta AMI:', response);
      res.json({ message: 'Llamada realizada con éxito' });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Something goes wrong retrieving the StatusApiBase",
    });
  }
};