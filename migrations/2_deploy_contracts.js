const DentalInsuranceVerifier = artifacts.require("DentalInsuranceVerifier");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function verifyBusinessWithRetry(instance, business, owner, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            await instance.verifyBusiness(business.address, business.name, business.location, { from: owner });
            console.log(`Verified ${business.name} at ${business.location}`);
            return;
        } catch (error) {
            console.error(`Error verifying ${business.name}:`, error);
            if (i < retries - 1) {
                await sleep(1000); // Adjust delay as needed
            } else {
                throw error;
            }
        }
    }
}

module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(DentalInsuranceVerifier);
    const instance = await DentalInsuranceVerifier.deployed();
    const owner = accounts[0];

    // Define businesses
    const businesses = [
        {
            address: "0x6473C3AE4B0b0FE47dfa4Fd85fFcB00f9f5795C4",
            name: "Gentle Family Dentistry",
            location: "Naperville, IL"
        },
        {
            address: "0x1234567890abcdef1234567890abcdef12345678",
            name: "Powers Dental Care",
            location: "Lawrence, KS"
        },
        {
            address: "0x1234577890abcdef1234567890abcdef12345678",
            name: "Luke Does Dentistry",
            location: "Topeka, KS"
        },
        {
            address: "0x9876543210abcdef9876543210abcdef98765432",
            name: "Smiley Dentistry",
            location: "Iowa City, IA"
        },
        {
            address: "0xabcdef1234567890abcdef1234567890abcdef12",
            name: "Aspen Dental",
            location: "Aspen, CO"
        },
        {
            address: "0x1234567890abcdef1234567890abcdef12345679",
            name: "Signature Dental",
            location: "Lawrence, KS"
        }
    ];

    // Verify each business with retry logic and delay to handle rate limits
    for (let business of businesses) {
        await verifyBusinessWithRetry(instance, business, owner);
    }
};
