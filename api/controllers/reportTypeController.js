'use strict';

var mongoose = require('mongoose');
var ReportType = mongoose.model('ReportType');

// ====================================================
// ======================  CRUD  ======================
// ====================================================

//TODO : Doc comments
// Return the reportType after his creation or return error
exports.createReportType = function (request, response) {
    let new_reportType = new ReportType(request.body);
    new_reportType.save(function (err, new_reportType) {
        if (err) {
            response.send(err);
        }
        response.json(new_reportType);
    });
};

/**
 * @api {GET} /reportType Getting all report type
 * @apiName GetAllReportType
 * @apiGroup ReportType
 * @apiSuccess {ObjectList} ReportTypes List of all Report Types
 * @apiSuccessExample Success-Response
 * [
 *  {
 *      title : "REPORTTYPE"
 *  }
 * ]
 */
exports.getAllReportType = function (request, response) {
    ReportType.find({}, function (err, reportType) {
        if (err) {
            response.send(err);
        }
        response.json(reportType);
    });
};

//TODO : Doc comments
// Return one reportType find by his id or return error
exports.getReportTypeById = function (request, response) {
    ReportType.findById(request.params.reportTypeId, function (err, reportType) {
        if (err) {
            response.send(err);
        }
        response.json(reportType);
    })
}

//TODO : Doc comments
// Returne the evnetType updated or error
exports.updateReportType = function (request, response) {
    ReportType.findByIdAndUpdate({ _id: request.params.reportTypeId }, request.body, { new: true }, function (err, reportType) {
        if (err) {
            response.send(err);
        }
        response.json(reportType);
    });
};

//TODO : Doc comments
// Return message if deletion is a success or return error
exports.deleteReportType = function(request, response){
    ReportType.findByIdAndRemove({ _id: request.params.reportTypeId }, function (err, reportType) {
        if (err) {
            response.send(err);
        }
        response.json({ success: true, message: 'Report Type deleted' });
    });
};
