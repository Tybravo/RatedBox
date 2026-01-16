#[test_only]
module cleanrest::philanthropist_badge_tests {

    use cleanrest::philanthropist_badge::{Self, AdminCap, BadgeRegistry};
    use sui::test_scenario::{Self, Scenario};
    use sui::clock;

    /***************
     * HELPERS
     ***************/
    fun setup(): (Scenario, AdminCap, BadgeRegistry) {
        let mut scenario = test_scenario::begin(@0xA);
        philanthropist_badge::init_for_testing(test_scenario::ctx(&mut scenario));

        test_scenario::next_tx(&mut scenario, @0xA);

        let admin = test_scenario::take_from_sender<AdminCap>(&scenario);
        let registry = test_scenario::take_shared<BadgeRegistry>(&scenario);

        (scenario, admin, registry)
    }

    /***************
     * TEST: SUCCESSFUL MINT
     ***************/
    #[test]
    fun test_mint_success() {
        let (mut scenario, admin, mut registry) = setup();
        let clock = clock::create_for_testing(test_scenario::ctx(&mut scenario));

        philanthropist_badge::mint_badge(
            &admin,
            &mut registry,
            @0xB,
            b"Philanthropist",
            &clock,
            test_scenario::ctx(&mut scenario)
        );

        clock::destroy_for_testing(clock);
        test_scenario::return_to_sender(&scenario, admin);
        test_scenario::return_shared(registry);
        test_scenario::end(scenario);
    }

    /***************
     * TEST: DUPLICATE BADGE (FAIL)
     ***************/
    #[test]   
    #[expected_failure(abort_code =::cleanrest::philanthropist_badge::E_ALREADY_HAS_BADGE)]
    fun test_double_mint_fails() {
        let (mut scenario, admin, mut registry) = setup();
        let clock = clock::create_for_testing(test_scenario::ctx(&mut scenario));

        philanthropist_badge::mint_badge(
            &admin,
            &mut registry,
            @0xB,
            b"NGO",
            &clock,
            test_scenario::ctx(&mut scenario)
        );

        philanthropist_badge::mint_badge(
            &admin,
            &mut registry,
            @0xB,
            b"NGO",
            &clock,
            test_scenario::ctx(&mut scenario)
        );

        clock::destroy_for_testing(clock);
        test_scenario::return_to_sender(&scenario, admin);
        test_scenario::return_shared(registry);
        test_scenario::end(scenario);
    }

    /***************
     * TEST: DIFFERENT USERS
     ***************/
    #[test]
    fun test_multiple_recipients() {
        let (mut scenario, admin, mut registry) = setup();
        let clock = clock::create_for_testing(test_scenario::ctx(&mut scenario));

        philanthropist_badge::mint_badge(
            &admin,
            &mut registry,
            @0xB,
            b"Influencer",
            &clock,
            test_scenario::ctx(&mut scenario)
        );

        philanthropist_badge::mint_badge(
            &admin,
            &mut registry,
            @0xC,
            b"NGO",
            &clock,
            test_scenario::ctx(&mut scenario)
        );

        clock::destroy_for_testing(clock);
        test_scenario::return_to_sender(&scenario, admin);
        test_scenario::return_shared(registry);
        test_scenario::end(scenario);
    }
}
