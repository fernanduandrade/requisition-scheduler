class RequisitionFactory {

	Build(appointmentUser) {

		let year = appointmentUser.date.getFullYear();
		let month = appointmentUser.date.getMonth();
		let day = appointmentUser.date.getDate() + 1;

		let date = new Date(year, month, day);

		let requisition = {
			id: appointmentUser._id,
			title: appointmentUser.name,
			start: date,
			end: date
		}

		return requisition;
	}
}

export default new RequisitionFactory();