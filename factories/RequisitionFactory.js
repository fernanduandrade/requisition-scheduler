class RequisitionFactory {

	Build(appointmentUser) {

		let requisition = {
			id: appointmentUser._id,
			title: appointmentUser.name + ' - ' + appointmentUser.description,
			phone: appointmentUser.phone
			scheduled: appointmentUser.date,
		}

		return requisition;
	}
}

export default new RequisitionFactory();