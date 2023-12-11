/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/currentRecord', 'N/record', 'N/runtime', 'N/format'],

    function(currentRecord, record, runtime, format) {
    
    const raiseEscalation = function() {
        var memo = '';
        
        Ext.MessageBox.show({
            title : 'Escalate Sales Order Issue',
            msg : 'Please enter a short memo indicating the issue.',
            width : 300,
            buttons : Ext.MessageBox.OKCANCEL,
            multiline : true,
            scope : this,
            fn : function(btn, reason, cfg){ 
                 if (btn == 'ok' && Ext.isEmpty(reason)) { 
                    //if you want to mark the text as mandatory
        
                    Ext.MessageBox.show(Ext.apply({}, {msg:cfg.msg}, cfg));  
                 }else if (btn =='ok') {
                    memo = reason;
                    // If memo still is blank, then the user clicked either cancel or close. Exit.
                    if (memo == '') {
                        return;
                    }

                    // Load record
                    var recId = currentRecord.get().id;
                    record.load.promise({type: record.Type.SALES_ORDER, id: recId}).then(function(rec) {
                        // Set fields
                        var date = new Date();

                        rec.setValue({fieldId: 'custbody_escalation_status_timestamp', value: date});

                        rec.setValue({fieldId: 'custbody_escalation_status_memo', value: memo.substring(0, 50)});

                        rec.setValue({fieldId: 'custbody_cust_escalation_user', value: runtime.getCurrentUser().id});

                        // Save record
                        rec.save.promise().then(function() {
                            // Reload
                            location.reload();
                        });
                    });           
                }
            }
        });
    }

    const updateEscalation = function() {
        var memo = '';
        
        Ext.MessageBox.show({
            title : 'Updated Escalated Sales Order Issue',
            msg : 'Please enter a short memo indicating the update.',
            width : 300,
            buttons : Ext.MessageBox.OKCANCEL,
            multiline : true,
            scope : this,
            fn : function(btn, reason, cfg){ 
                 if (btn == 'ok' && Ext.isEmpty(reason)) { 
                    //if you want to mark the text as mandatory
        
                    Ext.MessageBox.show(Ext.apply({}, {msg:cfg.msg}, cfg));  
                 }else if (btn =='ok') {
                    memo = reason;
                    // If memo still is blank, then the user clicked either cancel or close. Exit.
                    if (memo == '') {
                        return;
                    }

                    // Load record
                    var recId = currentRecord.get().id;
                    record.load.promise({type: record.Type.SALES_ORDER, id: recId}).then(function(rec) {
                        // Set fields
                        var date = new Date();

                        rec.setValue({fieldId: 'custbody_escalation_status_timestamp', value: date});

                        rec.setValue({fieldId: 'custbody_escalation_status_memo', value: memo.substring(0, 50)});

                        rec.setValue({fieldId: 'custbody_cust_escalation_user', value: runtime.getCurrentUser().id});

                        // Save record
                        rec.save.promise().then(function() {
                            // Reload
                            location.reload();
                        });
                    });           
                }
            }
        });
    }

    const resolveEscalation = function () {

        // Load record
        var recId = currentRecord.get().id;
        record.load.promise({type: record.Type.SALES_ORDER, id: recId}).then(function(rec) {
            // Set fields
            var date = new Date();

            rec.setValue({fieldId: 'custbody_escalation_status_timestamp', value: null});

            rec.setValue({fieldId: 'custbody_escalation_status_memo', value: null});

            rec.setValue({fieldId: 'custbody_cust_escalation_user', value: null});

            // Save record
            rec.save.promise().then(function() {
                // Reload
                location.reload();
            });
        });           
    }

    function pageInit(scriptContext) {

    }

    return {
        pageInit: pageInit,
        raiseEscalation: raiseEscalation,
        updateEscalation: updateEscalation,
        resolveEscalation: resolveEscalation,
    };
    
});
