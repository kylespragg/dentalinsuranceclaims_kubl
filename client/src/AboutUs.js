import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './aboutus.css';

const AboutUs = () => {

  return (
    <div id="background">
      <div id="abUsContainer">
        <h1 id="spreechWelcome">
            Welcome, 
        </h1>
        <h2 id="spreech">
            InsuraCare is a software service built under the scope of Web3 and the Ethereum Network. This application is the first stage in a three step process to
            make data more transparent across the dental insurance industry. Roughly 6 billion dollars in dental insurance claims is related to fraud each year, 
            and the number is steadily increasing as the market size grows. This application is an intial step to present a solution to reduce this rate, and further scale to other
            insurance industries. This will allow transactional data to be transparent, but more importantly, secure. After implementing onchain data records for insurance transactions, it would
            allow insurance companies to shift over to new technologies. By utilizing machine learning models to identify, extract, and report fradulent insurance claims on the ledger, companies could
            see a significant reduction in associative risk. With a lower associative risk, they could lower insurance rates. In the third stage, the fully implementation of these three projects would allow companies to
            take preventative measures live on the blockchain to continue to minimize risk.<br />

            <br />This project was initially built to be ran on Hyperledger-Fabric, but computer operating system issues prevented this. In a live deployment of this, utilizing Hyperledger-Fabric would 
            be more a more practical approach. Since Hyperledger-Fabric still utilizes the transparency and security of a digital ledger, it can keep track of data. Beyond this, the key features that make this product so enticing
            is:<br />
          <br />(1) They allow certain particiapants onchain, verified by the owner of the software.<br />
                (2) There is no requirement for businesses to set up a wallet or use digital currencies.<br />
            
            <br />In an industry that is heavily regulated, it is import to note that the transactions should not be volatile. Furthermore, most business owners may have no understanding
            of what Blockchain actually entails. Therefore, a slow integration of digital wallets and currencies throughout this three-step process would ease businesses into its benefits.
        </h2>
        <h1 id="walletInfo">Wallets that you can use to enter our Insurance Validator:
        </h1>
        <h2 id="wallets">
        <br />"address": "0x1234567890abcdef1234567890abcdef12345678",
        "name": "Powers Dental Care",
        "location": "Lawrence, KS"<br />
        <br />"address": "0x1234577890abcdef1234567890abcdef12345678",
        "name": "Luke Does Dentistry",
        "location": "Topeka, KS"<br />
        <br />"address": "0x9876543210abcdef9876543210abcdef98765432",
        "name": "Smiley Dentistry",
        "location": "Iowa City, IA"<br />
        <br />"address": "0xabcdef1234567890abcdef1234567890abcdef12",
        "name": "Aspen Dental",
        "location": "Aspen, CO"<br />
        <br />"address": "0x1234567890abcdef1234567890abcdef12345679",
        "name": "Signature Dental",
        "location": "Lawrence, KS"<br />
        </h2>
        <h3 id="noteWallets">Note: These wallets are fake addresses for security purposes</h3>
      </div>
      <center><h3>® InsuraCare 2024. All Rights Reserved.</h3></center>
    </div>
  );
};

export default AboutUs;
