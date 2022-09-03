public with sharing class DonationController {
    public DonationController() {
    }

    /**
     * Check if event is already has a donation
     * Note: There can only be one donation per event
     *
     * @param donations (List<Donation__c>): List of donation objects
     * @param isUpdate (Boolean): indicates whether if the event is an update event
     */
    public void checkDuplicateEvent(List<Donation__c> donations, Boolean isUpdate) {
        for (Donation__c donation : donations) {
            if (String.isNotBlank(donation.Event__c)) {
                // Check if event already has a donation
                Integer count = [SELECT Count() FROM Donation__c where Event__r.id = :donation.Event__c];
                
                if (count > 0) {        
                    // Fetch event name
                    Event__c event = [SELECT Name, (Select Id from Donations__r) from Event__c WHERE Id = :donation.Event__c];

                    // Check if user is updating same donation to which event is associated
                    if (isUpdate) {
                        // Referring 0th index of donation since one event is associated with one donation
                        if (event.Donations__r[0].Id == donation.Id)
                            continue;
                    }

                    donation.addError(event.Name + ' already has a donation');
                }
            }
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Donation__c> getDonationOfMonth(Integer month, Integer year){
        List<Donation__c> donations = [SELECT Id, Name, Donation_Date__c, Amount__c, Persona__r.Name, Event__r.Name from Donation__c WHERE CALENDAR_MONTH(Donation_Date__c) = :month AND CALENDAR_YEAR(Donation_Date__c) = :year];
        return donations;
    }
}
