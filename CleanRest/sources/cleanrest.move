#[allow(duplicate_alias)]
module cleanrest::philanthropist_badge {

    use sui::object::UID;
    use sui::tx_context::TxContext;
    use sui::transfer;
    use sui::event;
    use sui::clock::Clock;
    use sui::table::{Self, Table};

    /***************
     * ERRORS
     ***************/
    const E_ALREADY_HAS_BADGE: u64 = 2;

    /***************
     * EVENTS
     ***************/
    public struct BadgeMinted has copy, drop {
        recipient: address,
        category: vector<u8>,
        timestamp: u64
    }

    /***************
     * NFT STRUCT
     ***************/
    public struct PhilanthropistBadge has key, store {
        id: UID,
        name: vector<u8>,
        description: vector<u8>,
        category: vector<u8>, // Influencer | NGO | Philanthropist
        issued_at: u64
    }

    /***************
     * ADMIN CAP
     ***************/
    public struct AdminCap has key {
        id: UID
    }

    /***************
     * STATE
     ***************/
    public struct BadgeRegistry has key {
        id: UID,
        minted: Table<address, bool>
    }

    /***************
     * INIT
     ***************/
    fun init(ctx: &mut TxContext) {
        let admin = AdminCap {
            id: object::new(ctx)
        };

        let registry = BadgeRegistry {
            id: object::new(ctx),
            minted: table::new(ctx)
        };

        transfer::transfer(admin, tx_context::sender(ctx));
        transfer::share_object(registry);
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(ctx);
    }

    /***************
     * MINT BADGE
     ***************/
    public entry fun mint_badge(
        _admin: &AdminCap,
        registry: &mut BadgeRegistry,
        recipient: address,
        category: vector<u8>,
        clock: &Clock,
        ctx: &mut TxContext
    ) {
        // Ensure recipient has no badge
        let exists = table::contains(&registry.minted, recipient);
        assert!(!exists, E_ALREADY_HAS_BADGE);

        let badge = PhilanthropistBadge {
            id: object::new(ctx),
            name: b"CleanRest Impact Badge",
            description: b"Awarded for supporting clean public restrooms in Nigeria",
            category,
            issued_at: clock.timestamp_ms()
        };

        table::add(&mut registry.minted, recipient, true);
        transfer::transfer(badge, recipient);

        event::emit(BadgeMinted {
            recipient,
            category,
            timestamp: clock.timestamp_ms()
        });
    }
}
