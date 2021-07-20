import React, { useState } from "react";
import uniqid from "uniqid";
import {
  Radio,
  DatePicker,
  Space,
  Form,
  Table,
  Button,
  Input,
  Divider,
} from "antd";
import { InputNumber } from "antd";
import moment from "moment";
import { Select } from "antd";

const Registro = (props) => {
  //Props
  const { Column } = Table;
  const [form] = Form.useForm();
  const { TextArea } = Input;

  var today = moment();
  const dateFormat = "DD/MM/YYYY";
  const { Option } = Select;
  const [tipoRegistro, setTipoRegistro] = useState("Gasto");
  const [monto, setMonto] = useState(null);
  const [fecha, setFecha] = useState({
    fechaRegistro: today,
    formatoFechaRegistro: today.format(dateFormat),
  });
  const [notas, setNotas] = useState("");
  const [categoria, setCategoria] = useState("");
  const [listaRegistros, setListaRegistros] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  // cambios de estado

  //Funciones selector de fecha

  function handleChangeSelectCategoria(value) {
    console.log(value);
    setCategoria(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
  }

  function onBlurSelectCategoria() {
    console.log("blur");
  }

  function onFocusSelectCategoria() {
    console.log("focus");
  }

  function onSearchSelectCategoria(val) {
    console.log("search:", val);
  }
  //funciones
  const onChangeTipoRegistro = (e) => {
    console.log("Tipo de movimiento escogido", e.target.value);
    setTipoRegistro(e.target.value);
  };
  //   const onChangeMonto = monto => value => {
  //     console.log(monto, value);
  //  };
  const onChangeMonto = (value) => {
    setMonto(value);
  };
  const onChangeFecha = (value, dateString) => {
    //console.log("Fecha actualizado", e.target.value);
    setFecha({ fechaRegistro: value, formatoFechaRegistro: dateString });
  };

  //agregar registro nuevo

  const addRegistro = (e) => {
    // e.preventDefault();
    // Campos mandatorios
    // setListaRegistros(nombre)
    // if (!monto.trim()) {
    //   setError("El campo monto esta vacío");
    //   return;
    // }
    // if (!fecha.trim()) {
    //   setError("El campo fecha esta vacío");
    //   return;
    // }
    // if (!categoria.trim()) {
    //   setError("El campo categoria esta vacío");
    //   return;
    // }
    const nuevoRegistro = {
      id: uniqid(),
      tipoRegistro: tipoRegistro,
      monto: monto,
      categoria: categoria,
      fecha: fecha.formatoFechaRegistro,
      notas: notas,
    };
    setListaRegistros([...listaRegistros, nuevoRegistro]);
    setMonto(0);
    setFecha({
      fechaRegistro: today,
      formatoFechaRegistro: today.format(dateFormat),
    });
    setNotas("");
    setCategoria("");
    setError(null);
    setTipoRegistro("Gasto");
  };
  const deleteRegistro = (id) => {
    const nuevaArray = listaRegistros.filter((item) => item.id !== id);

    setListaRegistros(nuevaArray);
  };
  //editr registro existente
  const editar = (item) => {
    setModoEdicion(true);
    setCategoria(item.categoria);
    setTipoRegistro(item.tipoRegistro);
    setMonto(item.monto);
    setFecha(item.fecha);
    setNotas(item.notas);
    setId(item.id);
    form.setFieldsValue({
      id: id,
      categoria: item.categoria,
      tipoRegistro: item.tipoRegistro,
      monto: item.monto,
      fecha: moment(item.fecha,dateFormat),
      notas: item.notas,
    });
  };

  const editarRegistro = (e) => {
    // e.preventDefault();

    const nuevoArray = listaRegistros.map((item) =>
      item.id === id
        ? {
            id: id,
            categoria: categoria,
            tipoRegistro: tipoRegistro,
            monto: monto,
            fecha: fecha.formatoFechaRegistro,
            notas: notas,
          }
        : item
    );

    setListaRegistros(nuevoArray);
    setModoEdicion(false);
    setCategoria("");
    setTipoRegistro("Gasto");
    setMonto(0);
    setFecha({
      fechaRegistro: today,
      formatoFechaRegistro: today.format(dateFormat),
    });
    setNotas();
  };
  const onFinish = (values) => {
    console.log(typeof values);
    console.log("Received values of form: ", values.tipoRegistro);
    // setTipoRegistro(values.tipoRegistro);
    // setCategoria(values.categoria)
    // addCategoria(values);

    if (modoEdicion) {
      editarRegistro(values);
    } else {
      addRegistro(values);
    }
    form.resetFields();
  };
  console.log(listaRegistros);

  return (
    <div className="container">
      <Divider orientation="left">Registro de movimientos</Divider>
      <div className="col">
        <div className="row">
          <div className="col">
            <Divider orientation="left">Crear nuevo movimiento</Divider>
            {/* <form onSubmit={(e) => addCategoria(e)} className="form-group"> */}
            {/* <form
              onSubmit={modoEdicion ? editarRegistro : addRegistro}
              className="form-group"
            > */}
            <Form
              form={form}
              name="nuevoRegistro"
              onFinish={onFinish}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 10 }}
              // onFinish={modoEdicion ? editarCategoria : addCategoria}
            >
              <Form.Item
                name="tipoRegistro"
                label="Tipo de movimiento"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el tipo de registro",
                  },
                ]}
              >
                <Radio.Group
                  onChange={onChangeTipoRegistro}
                  value={tipoRegistro}
                >
                  <Radio value={"Gasto"}> Gasto </Radio>
                  <Radio value={"Ingreso"}> Ingreso </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="fecha"
                label="Fecha:"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese la fecha",
                  },
                ]}
                initialValue={today}
              >
                <DatePicker
                  onChange={onChangeFecha}
                  // defaultValue={today}
                  format={dateFormat}
                />
              </Form.Item>
              <Form.Item
                name="monto"
                label="Monto:"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese el monto",
                  },
                ]}
              >
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  onChange={onChangeMonto}
                />
              </Form.Item>
              <Form.Item
                name="categoria"
                label="Categoría:"
                rules={[
                  {
                    required: true,
                    message: "Por favor seleccione una categoría",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Seleccionar categoría"
                  optionFilterProp="children"
                  onChange={handleChangeSelectCategoria}
                  onFocus={onFocusSelectCategoria}
                  onBlur={onBlurSelectCategoria}
                  onSearch={onSearchSelectCategoria}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="comida">Comida</Option>
                  <Option value="transporte">Transporte</Option>
                  <Option value="salario">Salario</Option>
                </Select>
              </Form.Item>
              <Form.Item name="notas" label="Notas:">
                <TextArea
                  value={notas}
                  onChange={(e) => {
                    setNotas(e.target.value);
                  }}
                  placeholder="Agregar comentarios"
                  autoSize={{ minRows: 2, maxRows: 4 }}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                {modoEdicion ? "Editar registro" : "Registrar movimiento"}
              </Button>
            </Form>

            {/* <input
                onChange={(e) => {
                  setNotas(e.target.value);
                }}
                className="form-control mb-3"
                type="text"
                placeholder="Agregar comentarios"
                value={notas}
              /> */}
            {/* <input
                className="btn btn-info btn-block mb-3"
                type="submit"
                value={modoEdicion ? "Editar registro" : "Registrar movimiento"}
              /> */}
            {/* </form> */}
            {error != null ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <div></div>
            )}
          </div>
          <div className="col">
            <Divider orientation="left">Mis movimientos</Divider>
            <Table size="small" dataSource={listaRegistros}>
              <Column
                title="Tipo de registro"
                dataIndex="tipoRegistro"
                key="tipoRegistro"
                // responsive= 'md'
              />
              <Column
                title="Categoría"
                dataIndex="categoria"
                key="categoria"
                // responsive= 'md'
              />
              <Column
                title="Monto"
                dataIndex="monto"
                key="monto"
                // responsive= 'md'
              />
              <Column
                title="Fecha"
                dataIndex="fecha"
                key="fecha"
                // responsive= 'md'
              />

              <Column
                title="Acciones"
                key="action"
                // responsive= 'md'
                render={(item) => (
                  <Space size="middle">
                    <Button
                      type="primary"
                      onClick={() => {
                        console.log(item);
                        editar(item);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        deleteRegistro(item.id);
                      }}
                    >
                      Eliminar
                    </Button>
                  </Space>
                )}
              />
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
