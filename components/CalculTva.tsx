"use client"

import React from "react"
import { useFormInput } from "@/components/hooks/useFormInput"
import { calculerTVA } from "@/components/helpers"
import { ReusableForm } from "@/components/FormDisplay"
import ResultDisplay from "@/components/displayedResult"
interface TVAValues {
  totalTTC: number
  tauxTVA: number
  montantTVA: number
  totalHT: number
}

const CalculTVA: React.FC = () => {
  const [values, handleChange, setValues] = useFormInput<TVAValues>({
    totalTTC: 0,
    tauxTVA: 20,
    montantTVA: 0,
    totalHT: 0,
  })

  const calculate = () => {
    const result = calculerTVA(values)
    setValues((prevState) => ({ ...prevState, ...result }))
  }

  const fields = [
    {
      id: "totalTTC",
      name: "totalTTC",
      label: "Total TTC (MAD)",
      type: "number",
      value: values.totalTTC.toString(),
      onChange: handleChange,
    },
    {
      id: "tauxTVA",
      name: "tauxTVA",
      label: "Taux de TVA (%)",
      type: "number",
      value: values.tauxTVA.toString(),
      onChange: handleChange,
    },
  ]

  const results = [
    {
      label: "Montant de la TVA (MAD)",
      value: values.montantTVA,
    },
    {
      label: "Total HT (MAD)",
      value: values.totalHT,
    },
  ]

  // Check if all required fields have valid values
  const isFormValid = values.totalTTC > 0 && values.tauxTVA > 0

  return (
    <ReusableForm
      title="Calcul de la TVA"
      fields={fields}
      onSubmit={calculate}
      submitButtonText="Calculer TVA"
      result={<ResultDisplay results={results} />}
      isFormValid={isFormValid} // Pass the form validation state
    />
  )
}

export default CalculTVA
