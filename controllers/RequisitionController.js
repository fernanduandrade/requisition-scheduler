import { Requisition } from '../model/Requisition';

class RequisitionController {
    async create(req, res) {

        const { name, phone, date, location, exam } = req.body;
    
        try {
            const newRequisition = new Requisition({
                name,
                phone,
                date,
                location,
                exam,
                examFinished: false
            });

            await newRequisition.save();

            return res.redirect('/');

        } catch(error) {
            return res
                    .status(400)
                    .json(error);
        }
    }

    async update(req, res) {

        const {_id, name, phone, date, location, exam} = req.body;

	    const currentValues = {name, phone, date, location, exam}
            
        try {

            const updateRequisition = await Requisition.findByIdAndUpdate({_id}, currentValues, {new: true});

            if(updateRequisition) {
                return res.redirect('/lista');
            } else {
                return res.status(400);
            }
        
        } catch(error) {
            return res
                    .status(400)
                    .json(error);
        } 
    }

    async delete(req, res) {
        
        const { id } = req.params;

        try {

            const deleteRequisition = await Requisition.deleteOne({_id: id});
            
            if(deleteRequisition) {
                return res.redirect('/lista?page=1&limit=5')
                        
            } else {
                return res.status(404);
            }

        } catch(error) {
            console.log(error.message);
        }
    }
}

export default new RequisitionController();