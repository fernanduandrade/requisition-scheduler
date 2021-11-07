class RequisitionFactory {

	Build(appointmentUser) {
		
		let requisition = {
			id: appointmentUser._id,
			title: `${appointmentUser.hour} - ${appointmentUser.name}`,
			start: appointmentUser.date,
			end: appointmentUser.date,
			notified: appointmentUser.notified
		}

		return requisition;
	}
}

export default new RequisitionFactory();