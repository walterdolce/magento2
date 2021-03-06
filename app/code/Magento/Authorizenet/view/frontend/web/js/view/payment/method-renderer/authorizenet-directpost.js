/**
 * Copyright © 2015 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'jquery',
        'Magento_Payment/js/view/payment/iframe',
        'Magento_Checkout/js/action/set-payment-information',
        'Magento_Checkout/js/model/payment/additional-validators'
    ],
    function ($, Component, setPaymentInformationAction, additionalValidators) {
        'use strict';
        return Component.extend({
            defaults: {
                template: 'Magento_Authorizenet/payment/authorizenet-directpost'
            },
            placeOrderHandler: null,
            validateHandler: null,

            setPlaceOrderHandler: function(handler) {
                this.placeOrderHandler = handler;
            },

            setValidateHandler: function(handler) {
                this.validateHandler = handler;
            },

            context: function() {
                return this;
            },

            isShowLegend: function() {
                return true;
            },

            getCode: function() {
                return 'authorizenet_directpost';
            },

            isActive: function() {
                return true;
            },

            placeOrder: function() {
                var self = this;
                if (this.validateHandler() && additionalValidators.validate()) {
                    this.isPlaceOrderActionAllowed(false);
                    $.when(setPaymentInformationAction(this.messageContainer, {'method': self.getCode()})).done(function() {
                        self.placeOrderHandler();
                    }).fail(function() {
                        self.isPlaceOrderActionAllowed(true);
                    });
                }
            }
        });
    }
);
