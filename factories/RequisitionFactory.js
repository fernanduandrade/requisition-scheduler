class RequisitionFactory {

	Build(appointmentUser) {

		

		let requisition = {
			id: appointmentUser._id,
			title: appointmentUser.name,
			start: appointmentUser.date,
			end: appointmentUser.date
		}

		return requisition;
	}
}

export default new RequisitionFactory();