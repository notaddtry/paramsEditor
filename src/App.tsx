import React, { useState } from 'react'
import { IParam, IParamValue, IModel, IProps } from './types/index'

// const paramsValue: IParamValue[] = [
//   {
//     paramId: 1,
//     value: 'black',
//   },
//   {
//     paramId: 2,
//     value: 'transparent',
//   },
//   {
//     paramId: 3,
//     value: 'border-box',
//   },
//   {
//     paramId: 4,
//     value: 'relative',
//   },
// ]

// const model: IModel = {
//   paramValues: paramsValue,
// }

const App: React.FC = () => {
  const [params, setParams] = useState<IParam[]>([
    { id: 1, name: 'color' },
    { id: 2, name: 'background' },
    { id: 3, name: 'box-sizing' },
    { id: 4, name: 'position' },
  ])
  const [paramsValue, setParamsValue] = useState<IParamValue[]>([])
  const [model, setModel] = useState<IModel>({
    paramValues: paramsValue,
  })

  return (
    <div className='App'>
      <EditComponent
        model={model}
        params={params}
        setParams={setParams}
        setParamsValue={setParamsValue}
      />
      <h1>Hello,world</h1>
    </div>
  )
}

interface ParamRawProp {
  param: IParam
  model: IModel
  setParamsValue: React.Dispatch<React.SetStateAction<IParamValue[]>>
}

const ParamRaw: React.FC<ParamRawProp> = ({ param, model, setParamsValue }) => {
  //TODO
  const paramValue =
    model.paramValues.find((item) => item.paramId === param.id)?.value || ''

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    const paramToEdit: IParamValue = {
      paramId: param.id,
      value: e.target.value,
    }
    setParamsValue((prev) => ({ ...prev, paramToEdit }))
  }

  return (
    <li key={param.id}>
      <span>{param.name}</span>
      <input type='text' value={paramValue} onChange={(e) => handleChange(e)} />
    </li>
  )
}

interface EditComponentProps extends IProps {
  setParams: React.Dispatch<React.SetStateAction<IParam[]>>
  setParamsValue: React.Dispatch<React.SetStateAction<IParamValue[]>>
}

const EditComponent: React.FC<EditComponentProps> = ({
  model,
  params,
  setParams,
  setParamsValue,
}) => {
  const getModel = () => {
    return model
  }

  return (
    <ul>
      {params.map((param) => (
        <ParamRaw
          param={param}
          model={model}
          setParamsValue={setParamsValue}
          key={param.id}
        />
      ))}
    </ul>
  )
}

export default App
