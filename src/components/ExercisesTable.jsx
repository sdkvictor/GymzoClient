import MaterialTable from "material-table"
import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHistory } from "react-router-dom"
import colors from './../constants/colors';

const ExercisesTable = (props) => {
  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const columns = [
    { title: "Ejercicio", field: "name" },
    { title: "Sets", field: "sets" },
    { title: "Repeticiones", field: "reps" },
    { title: "Peso", field: "weight" },
  ]
  const { user } = useContext(AuthContext)
  const history = useHistory();

  function toggleModalWithData(selectedRow) {
    setSR(selectedRow)

    handleOpen()
  }

  const [showModal, setShowModal] = useState(false)

  const handleOpen = () => {
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
  }
  const [sR, setSR] = useState({})

  useEffect(() => {
    // const val = getPending("test@test.com").then((resp) => {
    setData(props.exercises)
  }, [])

  

  return (
    <div >
      <MaterialTable
        title="Ejercicios"
        data={props.cameras}
        onSelectionChange={(rows) => setSelectedRows(rows)}
        onRowClick={(evt, selectedRow) => toggleModalWithData(selectedRow)}
        columns={columns}
        options={{
          selection: false,
          search: false,
          paging: false,
          filtering: false,
          exportButton: false,
        }}
        actions={[
         
        ]}
      />

      
    </div>
  )
}

const styles = {
  button: {
    margin: 20,
    backgroundColor: colors.primary,
    color: colors.white
  }
}

export default ExercisesTable