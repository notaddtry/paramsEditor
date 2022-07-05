import React, { useState } from 'react'

interface IParam {
  id: number
  name: string
}
interface IParamValue {
  paramId: number
  value: string
}
interface IModel {
  paramValues: IParamValue[]
}
interface IProps {
  params: IParam[]
  model: IModel
}

interface EditComponentProps extends IProps {
  paramsValue: IParamValue[]
  setParamsValue: React.Dispatch<React.SetStateAction<IParamValue[]>>
  setParams: React.Dispatch<React.SetStateAction<IParam[]>>
}

interface ParamRawProp {
  param: IParam
  model: IModel
  paramsValue: IParamValue[]
  setParamsValue: React.Dispatch<React.SetStateAction<IParamValue[]>>
}

const App: React.FC = () => {
  const [params, setParams] = useState<IParam[]>([])
  const [paramsValue, setParamsValue] = useState<IParamValue[]>([])
  const model: IModel = {
    paramValues: paramsValue as IParamValue[],
  }

  return (
    <div className='container'>
      <EditComponent
        model={model}
        params={params}
        paramsValue={paramsValue}
        setParams={setParams}
        setParamsValue={setParamsValue}
      />
    </div>
  )
}

const EditComponent: React.FC<EditComponentProps> = ({
  model,
  params,
  paramsValue,
  setParamsValue,
  setParams,
}) => {
  const [newParamName, setNewParamName] = useState('')

  const getModel = () => {
    console.log(model)
  }

  const createParam = () => {
    if (newParamName.trim()) {
      const newParam = {
        id: Date.now(),
        name: newParamName,
      }
      setParams((prev) => [...prev, newParam])
      setNewParamName('')
    }
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    setNewParamName(e.target.value)
  }

  return (
    <>
      <div className='paramsList_wrapper'>
        <h1>Params list</h1>
        {!params.length ? (
          <span>Nothing here.. Try to add new param</span>
        ) : (
          <ul>
            {params.map((param) => (
              <ParamRaw
                param={param}
                model={model}
                paramsValue={paramsValue}
                setParamsValue={setParamsValue}
                key={param.id}
              />
            ))}
          </ul>
        )}
      </div>
      <div className='newParam_wrapper'>
        <span>Create new Param</span>
        <input
          type='text'
          placeholder='Enter new param name...'
          value={newParamName}
          onChange={(e) => handleChange(e)}
        />
        <button onClick={createParam}>Submit</button>
      </div>

      <button onClick={getModel}>Log model</button>
    </>
  )
}

const ParamRaw: React.FC<ParamRawProp> = ({
  param,
  model,
  paramsValue,
  setParamsValue,
}) => {
  const paramValue =
    model.paramValues.find((item) => item.paramId === param.id)?.value || ''

  const existsParam = paramsValue.find((item) => item.paramId === param.id)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()

    const paramToEdit: IParamValue = {
      paramId: param.id,
      value: e.target.value,
    }

    if (existsParam) {
      setParamsValue((prev) => {
        const array = prev.filter((prevItem) => {
          if (prevItem.paramId === existsParam.paramId) {
            return (prevItem.value = e.target.value)
          } else {
            return prevItem.value
          }
        })
        return array
      })
    } else {
      setParamsValue((prev) => [...prev, { ...paramToEdit }])
    }
  }

  return (
    <li key={param.id}>
      <span>{param.name}</span>
      <input type='text' value={paramValue} onChange={(e) => handleChange(e)} />
    </li>
  )
}

export default App
