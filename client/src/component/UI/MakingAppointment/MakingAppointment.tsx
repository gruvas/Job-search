import { Days } from './getDate'

const MakingAppointment = () => {
	return (
		<section className='making_appointment'>
			<h1 className='making_appointment_title'>
				Запись постановки на учет безработного
			</h1>

			<Days />
		</section>
	)
}

export default MakingAppointment
