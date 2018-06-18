'use strict';

var mongoose = require('mongoose');
var Report = mongoose.model('Report');
var notifSocket = require('../sockets/notificationSocket');

// ====================================================
// ======================  CRUD  ======================
// ====================================================

// Return the report after his creation or return error
exports.createReport = function (request, response) {
    let new_report = new Report(request.body);
    new_report.save(function (err, new_report) {
        if (err) {
            response.send(err);
        }
        response.json(new_report);
    });
};

//return a list of event or return error
exports.getAllReports = function (request, response) {
    Report.find({}, function (err, report) {
        if (err) {
            response.send(err);
        }
        response.json(report);
    });
};

//Return one report find by his id or return error
exports.getReportById = function (request, response) {
    Report.findById(request.params.reportId, function (err, response) {
        if (err) {
            response.send(err);
        }
        response.json(report);
    });
};

//Returne the report updated or return error
exports.updateReport = function (request, response) {
    Report.findByIdAndUpdate({ _id: request.params.reportId }, request.body, { new: true }, function (err, report) {
        if (err) {
            response.send(err);
        }
        response.json(report);
    });
};

//return message if deletion is a success or return error
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