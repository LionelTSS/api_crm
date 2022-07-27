import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";
import Swal from "sweetalert2";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClientes();
  }, []);

  const handleEliminar = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No puedes revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const url = `http://localhost:4000/clientes/${id}`;
          const respuesta = await fetch(url, {
            method: "DELETE",
          });
          await respuesta.json();
          Swal.fire("Eliminado!", "El cliente ha sido eliminado", "success");

          const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
          setClientes(arrayClientes);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;
