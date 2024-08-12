"use client"
import { ChangeEvent } from "react"
import Decimal from "decimal.js"
import { Button } from "@/components/ui/Form/Button/button"
import { InputWithLabel } from "@/components/ui/Form/InputWithLabel/InputWithLabel"
import { useDecimalArray } from "@/components/hooks/useDecimalArray"
import { useDecimalInput } from "@/components/hooks/useDecimalInput"
import { calculateTotal } from "@/components/helpers"

interface DecimalArrayInputProps {
  values: Decimal[]
  onChange: (index: number, value: string) => void
  onDelete: (index: number) => void
  label: string
  addNewItem: () => void
  disableDelete: boolean
}

const DecimalArrayInput = ({ values, onChange, onDelete, label, addNewItem, disableDelete }: DecimalArrayInputProps) => (
  <div className="mb-4">
    <label className="mb-2 block text-sm font-bold text-gray-700">{label}</label>
    {values.map((value, index) => (
      <div key={index} className="mb-2 flex items-center">
        <InputWithLabel
          id={`${label.toLowerCase().replace(/\s+/g, "-")}-${index}`}
          type="number"
          value={value.toString()}
          onChange={(e) => onChange(index, e.target.value)}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          label=""
        />
        <button
          type="button"
          onClick={() => onDelete(index)}
          className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
          disabled={disableDelete}
        >
          −
        </button>
      </div>
    ))}
    <button
      type="button"
      onClick={addNewItem}
      className="focus:shadow-outline rounded bg-green-500 px-2 py-1 font-bold text-white hover:bg-green-700 focus:outline-none"
    >
      +
    </button>
  </div>
)

const SuiviDepensesRevenus = () => {
  const [depenses, handleDepenseChange, addDepense, removeDepense] = useDecimalArray()
  const [revenus, handleRevenuChange, addRevenu, removeRevenu] = useDecimalArray()
  const [totalDepenses, handleTotalDepensesChange] = useDecimalInput()
  const [totalRevenus, handleTotalRevenusChange] = useDecimalInput()

  const calculerTotaux = () => {
    handleTotalDepensesChange({
      target: { value: calculateTotal(depenses).toString() },
    } as ChangeEvent<HTMLInputElement>)
    handleTotalRevenusChange({
      target: { value: calculateTotal(revenus).toString() },
    } as ChangeEvent<HTMLInputElement>)
  }

  // Check if there is at least one value in both arrays
  const isFormValid = depenses.length > 0 && revenus.length > 0

  // Disable the remove button if there are only two items in the respective array
  const disableRemoveDepense = depenses.length <= 1
  const disableRemoveRevenu = revenus.length <= 1

  return (
    <form className="mx-auto mb-4 max-w-lg rounded bg-white px-8 pb-8 pt-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Suivi des Dépenses et Revenus</h2>
      <DecimalArrayInput
        values={depenses}
        onChange={handleDepenseChange}
        onDelete={removeDepense}
        label="Liste des Dépenses (MAD)"
        addNewItem={addDepense}
        disableDelete={disableRemoveDepense}
      />
      <DecimalArrayInput
        values={revenus}
        onChange={handleRevenuChange}
        onDelete={removeRevenu}
        label="Liste des Revenus (MAD)"
        addNewItem={addRevenu}
        disableDelete={disableRemoveRevenu}
      />
      <div className="flex items-center justify-between">
        <Button
          type="button"
          onClick={calculerTotaux}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          disabled={!isFormValid} // Disable the button if the form is not valid
        >
          Calculer Totaux
        </Button>
      </div>
      <div className="mt-6">
        <p className="text-sm text-gray-700">
          Dépenses Totales (MAD): <span className="font-bold">{totalDepenses.toString()}</span>
        </p>
        <p className="text-sm text-gray-700">
          Revenus Totals (MAD): <span className="font-bold">{totalRevenus.toString()}</span>
        </p>
      </div>
    </form>
  )
}

export default SuiviDepensesRevenus
