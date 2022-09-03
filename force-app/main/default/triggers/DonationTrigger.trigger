trigger DonationTrigger on Donation__c (before insert, before update) {
    DonationController donationsController = new DonationController();
    donationsController.checkDuplicateEvent(Trigger.new, Trigger.isUpdate);
}