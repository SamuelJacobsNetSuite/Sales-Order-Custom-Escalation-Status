/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'],
    
    function (record) {

        const handleNoCurrentEscalations = function (scriptContext) {
            var form = scriptContext.form;

            form.clientScriptModulePath = 'SuiteScripts/escalation-workflow-handler.js';

            form.addButton({
                label: 'Raise Escalation',
                id: 'custpage_raise_escalation_button',
                functionName: 'raiseEscalation',
            });
        }

        const handleCurrentEscalation = function (scriptContext) {
            var form = scriptContext.form;

            form.clientScriptModulePath = 'SuiteScripts/escalation-workflow-handler.js';

            var timestamp = scriptContext.newRecord.getText({fieldId: 'custbody_escalation_status_timestamp'});
            var user = scriptContext.newRecord.getText({fieldId: 'custbody_cust_escalation_user'});
            var memo = scriptContext.newRecord.getValue({fieldId: 'custbody_escalation_status_memo'});

            var statusText = user + ' (' + timestamp + '): ' + memo;

            scriptContext.newRecord.setValue({
                fieldId: 'custbody_escalation_status_display',
                value: `<script>jQuery(function($){
                    require([], function() {
                        $(".uir-page-title-secondline").append('<div class="uir-record-status" id="custom-escalation-status" style="background-color: #fccfcf">${statusText}</div>');
                    });
                })</script>`
            })

            form.addButton({
                label: 'Update Escalation',
                id: 'custpage_update_escalation_button',
                functionName: 'updateEscalation',
            });

            form.addButton({
                label: 'Resolve Escalation',
                id: 'custpage_resolve_escalation_button',
                functionName: 'resolveEscalation',
            });
        }

        /**
         * Defines the function definition that is executed before record is loaded.
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type; use values from the context.UserEventType enum
         * @param {Form} scriptContext.form - Current form
         * @param {ServletRequest} scriptContext.request - HTTP request information sent from the browser for a client action only.
         * @since 2015.2
         */
        const beforeLoad = function (scriptContext) {
            // We use the timestamp field for escalations to determine whether there is an active escalation or whether there is no active escalation
            var timestamp = scriptContext.newRecord.getValue({fieldId: 'custbody_escalation_status_timestamp'});

            // Determine behaviour based on whether timestamp field is null or not null
            if (timestamp == null || timestamp == '') {
                handleNoCurrentEscalations(scriptContext);
            }else {
                handleCurrentEscalation(scriptContext);
            }
        }

        return {beforeLoad: beforeLoad};

    });
