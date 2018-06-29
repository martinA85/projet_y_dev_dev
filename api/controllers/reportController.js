//Doc snippet
/**
 * @apiDefine ReportObject
 * @apiSuccessExample Success-response
 * Example of a Report Object
 * {
 *      event : "eventId",
 *          //or
 *      user : "userId",
 *      reporter : "userId", //user that send the report
 *      reportType : "reportTypeId"
 * }
 */

 /**
  * @apiDefine paramReportId
  * @apiParam {String} :reportId Report unique id (_id)
  */


'use strict';

var mongoose = require('mongoose');
var Report = mongoose.model('Report');
var notifSocket = require('../sockets/notificationSocket');

// ====================================================
// ======================  CRUD  ======================
// ====================================================

/**
 * @api {POST} /report Creating a new Report
 * @apiName CreateReport
 * @apiGroup Report
 * @apiParam {Report} Report Report object to create
 * @apiParamExample {Report} Report
 * {
 *      event : "eventId",
 *          //or
 *      user : "userId",
 *      reporter : "userId", //user that send the report
 *      reportType : "reportTypeId"
 * }
 * @apiUse ReportObject
 */
exports.createReport = function (request, response) {
    let new_report = new Report(request.body);
    new_report.save(function (err, new_report) {
        if (err) {
            response.send(err);
        }
        response.json(new_report);
    });
};

/**
 * @api {GET} /report Getting all report
 * @apiName GetAllReports
 * @apiGroup Report
 * @apiSuccess {ObjectList} Reports List of all report
 * @apiSuccessExample Success-response
 * [{
 *      event : "eventId",
 *          //or
 *      user : "userId",
 *      reporter : "userId", //user that send the report
 *      reportType : "reportTypeId"
 * }]
 */
exports.getAllReports = function (request, response) {
    Report.find({}, function (err, report) {
        if (err) {
            response.send(err);
        }
        response.json(report);
    });
};

/**
 * @api {GET} /report/reportId Getting one report
 * @apiName GetReportById
 * @apiGroup Report
 * @apiUse paramReportId
 * @apiUse ReportObject
 */
exports.getReportById = function (request, response) {
    Report.findById(request.params.reportId, function (err, response) {
        if (err) {
            response.send(err);
        }
        response.json(report);
    });
};

/**
 * @api {PUT} /report/:reportId Updating a report
 * @apiName UpdateReport
 * @apiGroup Report
 * @apiUse paramReportId
 * @apiUse ReportObject
 */
exports.updateReport = function (request, response) {
    Report.findByIdAndUpdate({ _id: request.params.reportId }, request.body, { new: true }, function (err, report) {
        if (err) {
            response.send(err);
        }
        response.json(report);
    });
};

/**
 * @api {DELETE} /report/reportId Deleting a report
 * @apiName DeleteReport
 * @apiGroup Report
 * @apiUse paramReportId
 * @apiSuccess {Boolean} success Success Status
 * @apiSuccess {String} message Message returned
 */
exports.deleteReport = function (request, response) {
    Report.findByIdAndRemove({ _id: request.params.reportId }, function (err, report) {
        if (err) {
            response.send(err);
        }
        response.json({ success: true, message: 'Report deleted' })
    });
};


// =====================================================
// =================  Other function  ==================
// =====================================================

// Function that thanks user for having reporting
//TODO : code la fonction de feedback que envoie un remerciement pour leur report
exports.notifyFeedback = function (request, response) {
    var socketsId = request.body.socketsId;
    var notif = "Your report has help the community.";
    notifSocket.sendNotificationToUser(socketsId, notif, function (result) {
        if (result) {
            response.send('notif not recieve.');
        } else {
            response.send('notif send succefully.');
        }
    });
}