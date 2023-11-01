import React from 'react'
import DashboardHeader from './DashboardHeader'
import DashboardWidgets from '../../components/Admin/Widgets/DashboardWidgets'

type Props = {
  isDashboard?: boolean
}

const DashboardHero:React.FC<Props> = ({isDashboard}) => {
  const [open , setOpen] = React.useState(false)

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />

      {
        isDashboard && (
          <DashboardWidgets open={open} />
        )
      }
    </div>
  )
}

export default DashboardHero