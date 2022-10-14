import moment from "moment";

class DateTimeController {
    getTime(req, res) {
        let now = moment().format('LLLL');
        res.status(200).json(now);
    };
    
    
}