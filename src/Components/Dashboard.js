import BudgetCategorys from "./BudgetCategorys";
import ImportButton from "./Import";
import MonthlyTable from "./Monthlytable";
import Summary from "./Summary";

export default function Dashboard(){




    return(
      <>
        <div id="content" class="bg-white/10 col-span-9 rounded-lg p-6">
        <Summary />
        <BudgetCategorys />
        <ImportButton />
        <MonthlyTable />
        </div>
      </>
    )
}