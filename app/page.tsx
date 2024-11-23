"use client"

import React, { useState } from "react"
import Navigation from "@/components/Navigation"
import CalculTVA from "@/components/CalculTva"
import CalculHTTTC from "@/components/CalculHTTTC"
import CalculMargesBenefices from "@/components/CalculMargesBenefices"
import CalculAmortissements from "@/components/CalculAmortissements"
import SuiviDepensesRevenus from "@/components/SuiviDepensesRevenus"
import CalculSalaires from "@/components/CalculSalaires"

const componentMap = {
  CalculTVA,
  CalculHTTTC,
  CalculMargesBenefices,
  CalculAmortissements,
  SuiviDepensesRevenus,
  CalculSalaires,
}

export type ComponentKey = keyof typeof componentMap

const FormContainer: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<ComponentKey>("CalculTVA")

  const ActiveComponent = componentMap[activeComponent]

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">
      <nav className="w-full bg-white shadow-md md:w-64">
        <Navigation setActiveComponent={setActiveComponent} />
      </nav>
      <main className="flex-grow bg-white p-4 shadow-md md:p-8">
        <div className="mx-auto max-w-3xl">
          <ActiveComponent />
        </div>
                <div className="mx-auto max-w-3xl">
          <ActiveComponent />
        </div>
      </main>
    </div>
  )
}

export default FormContainer
