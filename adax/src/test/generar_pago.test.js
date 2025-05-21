describe('handleChange', () => {
  it('devuelve 0 si el input está vacío', () => {
    // Simulación de estados
    let cantidadRecibida = "10000";
    let devuelta = "5000";
    const setCantidadRecibida = jest.fn((val) => cantidadRecibida = val);
    const setDevuelta = jest.fn((val) => devuelta = val);
    const totalPagar2 = 5000;

    // Lógica simplificada de handleChange
    function handleChange(e) {
      if (e === "") {
        setCantidadRecibida("0");
        setDevuelta("0");
        return;
      }
      setCantidadRecibida(e);
      const valor = parseInt(e);
      var devuelta1 = valor - totalPagar2;
      if (devuelta1 < 1) {
        setDevuelta(0);
        return;
      }
      setDevuelta(devuelta1);
    }

    handleChange("");
    expect(setCantidadRecibida).toHaveBeenCalledWith("0");
    expect(setDevuelta).toHaveBeenCalledWith("0");
  });

  it('calcula correctamente la devuelta', () => {
    let cantidadRecibida = "0";
    let devuelta = "0";
    const setCantidadRecibida = jest.fn((val) => cantidadRecibida = val);
    const setDevuelta = jest.fn((val) => devuelta = val);
    const totalPagar2 = 5000;

    function handleChange(e) {
      if (e === "") {
        setCantidadRecibida("0");
        setDevuelta("0");
        return;
      }
      setCantidadRecibida(e);
      const valor = parseInt(e);
      var devuelta1 = valor - totalPagar2;
      if (devuelta1 < 1) {
        setDevuelta(0);
        return;
      }
      setDevuelta(devuelta1);
    }

    handleChange("7000");
    expect(setCantidadRecibida).toHaveBeenCalledWith("7000");
    expect(setDevuelta).toHaveBeenCalledWith(2000);
  });
});