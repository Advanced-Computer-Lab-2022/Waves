import React, {
  CSSProperties,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const Terms = () => {
  return (
    <div className="documentation__main">
      <div className="ud-container">
        <div id="terms" className="ud-text-with-links">
          <h1>Trainee Terms</h1>
          <p>
            <i>These Trainee Terms were last updated May 3, 2021.</i>
          </p>
          <p>
            When you sign up to become an Trainee on the Alien Learning
            platform, you agree to abide by these Trainee Terms ("
            <b>Terms</b>"). These Terms cover details about the aspects of the
            Alien Learning platform relevant to Trainees and are incorporated
            by reference into our <a href="/terms/">Terms of Use</a>, the
            general terms that govern your use of our Services. Any capitalized
            terms that aren't defined in these Terms are defined as specified in
            the Terms of Use.
          </p>
          <p>
            As an Trainee, you are contracting directly with Alien Learning,
            Inc. (a Delaware corporation in the United States), regardless of
            whether another Alien Learning subsidiary facilitates payments to
            you.
          </p>
          <h2>1. Trainee Obligations</h2>
          <p>
            As an Trainee, you are responsible for all content that you post,
            including lectures, quizzes, coding exercises, practice tests,
            assignments, resources, answers, course landing page content, labs,
            assessments, and announcements ("<b>Submitted Content</b>").
          </p>
          <p>You represent and warrant that:</p>
          <ul>
            <li>you will provide and maintain accurate account information;</li>
            <li>
              you own or have the necessary licenses, rights, consents,
              permissions, and authority to authorize Alien Learning to use your
              Submitted Content as specified in these Terms and the Terms of
              Use;
            </li>
            <li>
              your Submitted Content will not infringe or misappropriate any
              third party's intellectual property rights;
            </li>
            <li>
              you have the required qualifications, credentials, and expertise
              (including education, training, knowledge, and skill sets) to
              teach and offer the services that you offer through your Submitted
              Content and use of the Services; and
            </li>
            <li>
              you will ensure a quality of service that corresponds with the
              standards of your industry and instruction services in general.
            </li>
          </ul>
          <p>
            You warrant that you will <u>not</u>:
          </p>
          <ul>
            <li>
              post or provide any inappropriate, offensive, racist, hateful,
              sexist, pornographic, false, misleading, incorrect, infringing,
              defamatory or libelous content or information;
            </li>
            <li>
              post or transmit any unsolicited or unauthorized advertising,
              promotional materials, junk mail, spam, or any other form of
              solicitation (commercial or otherwise) through the Services or to
              any user;
            </li>
            <li>
              use the Services for business other than providing tutoring,
              teaching, and instructional services to students;
            </li>
            <li>
              engage in any activity that would require us to obtain licenses
              from or pay royalties to any third party, including the need to
              pay royalties for the public performance of a musical work or
              sound recording;
            </li>
            <li>
              frame or embed the Services (such as to embed a free version of a
              course) or otherwise circumvent the Services;
            </li>
            <li>
              impersonate another person or gain unauthorized access to another
              person's account;
            </li>
            <li>
              interfere with or otherwise prevent other Trainees from
              providing their services or content; or
            </li>
            <li>abuse Alien Learning resources, including support services.</li>
          </ul>
          <h2>2. License to Alien Learning</h2>
          <p>
            You grant Alien Learning the rights detailed in the{" "}
            <a href="/terms/">Terms of Use</a> to offer, market, and otherwise
            exploit your Submitted Content. This includes the right to add
            captions or otherwise modify Submitted Content to ensure
            accessibility. You also authorize Alien Learning to sublicense these
            rights to your Submitted Content to third parties, including to
            students directly and through third parties such as resellers,
            distributors, affiliate sites, deal sites, and paid advertising on
            third-party platforms.
          </p>
          <p>
            Unless otherwise agreed (including within our{" "}
            <a href="https://support.alienlearning.com/hc/en-us/articles/115013339928">
              Promotions Policy
            </a>
            ), you have the right to remove all or any portion of your Submitted
            Content from the Services at any time. Except as otherwise agreed,
            Alien Learning's right to sublicense the rights in this section will
            terminate with respect to new users 60 days after the Submitted
            Content's removal. However, (1) rights given to students before the
            Submitted Content's removal will continue in accordance with the
            terms of those licenses (including any grants of lifetime access)
            and (2) Alien Learning's right to use such Submitted Content for
            marketing purposes shall survive termination.
          </p>
          <p>
            We may record and use all or any part of your Submitted Content for
            quality control and for delivering, marketing, promoting,
            demonstrating, or operating the Services. You grant Alien Learning
            permission to use your name, likeness, voice, and image in
            connection with offering, delivering, marketing, promoting,
            demonstrating, and selling the Services, your Submitted Content, or
            Alien Learning's content, and you waive any rights of privacy,
            publicity, or other rights of a similar nature, to the extent
            permissible under applicable law.
          </p>
          <h2>3. Trust &amp; Safety</h2>
          <h3>3.1 Trust &amp; Safety Policies</h3>
          <p>
            You agree to abide by Alien Learning's{" "}
            <a href="https://support.alienlearning.com/hc/en-us/categories/204119748">
              Trust &amp; Safety policies
            </a>
            ,{" "}
            <a href="https://support.alienlearning.com/hc/en-us/articles/229233027">
              Restricted Topics policy
            </a>
            , and other content quality standards or policies prescribed by
            Alien Learning from time to time. You should check these policies
            periodically to ensure that you comply with any updates to them. You
            understand that your use of the Services is subject to Alien
            Learning's approval, which we may grant or deny at our sole
            discretion.
          </p>
          <p>
            We reserve the right to remove content, suspend payouts, and/or ban
            Trainees for any reason at any time, without prior notice,
            including in cases where:
          </p>
          <ul>
            <li>
              an Trainee or content does not comply with our policies or
              legal terms (including the Terms of Use);
            </li>
            <li>
              content falls below our quality standards or has a negative impact
              on the student experience;
            </li>
            <li>
              an Trainee engages in behavior that might reflect unfavorably
              on Alien Learning or bring Alien Learning into public disrepute,
              contempt, scandal, or ridicule;
            </li>
            <li>
              an Trainee engages the services of a marketer or other business
              partner who violates Alien Learning's policies;
            </li>
            <li>
              an Trainee uses the Services in a way that constitutes unfair
              competition, such as promotion of their off-site business in a way
              that violates Alien Learning's policies; or
            </li>
            <li>as determined by Alien Learning in its sole discretion.</li>
          </ul>
          <h3>3.2 Co-Trainees and Teaching Assistants</h3>
          <p>
            The Alien Learning platform allows you to add other users as
            co-Trainees or teaching assistants for Submitted Content that you
            manage, and you are required to comply with our{" "}
            <a href="https://www.alienlearning.com/support/229605728/">
              Co-Trainee Relationship Rules and Guidelines
            </a>
            when taking such actions. By adding a co-Trainee or teaching
            assistant, you understand that you are authorizing them to take{" "}
            <a href="https://www.alienlearning.com/support/229604308/">
              certain actions
            </a>{" "}
            that affect your Alien Learning account and Submitted Content.
            Violations of Alien Learning's terms and policies by your
            co-Trainee or teaching assistant may also impact your Alien
            Learning account and Submitted Content. Alien Learning is not able
            to advise on any questions or mediate any disputes between you and
            such users. If your co-Trainees have an assigned revenue share,
            their share will be paid out of your earned revenue share based on
            the ratios you have specified in your Course Management settings as
            of the date of the purchase.
          </p>
          <h3>3.3 Relationship to Other Users</h3>
          <p>
            Trainees don't have a direct contractual relationship with
            students, so the only information you'll receive about students is
            what is provided to you through the Services. You agree that you
            will not use the data you receive for any purpose other than
            providing your services to those students on the Alien Learning
            platform, and that you won't solicit additional personal data or
            store students' personal data outside the Alien Learning platform.
            You agree to indemnify Alien Learning against any claims arising
            from your use of students' personal data.
          </p>
          <h3>3.4 Anti-Piracy Efforts</h3>
          <p>
            We partner with anti-piracy vendors to help protect your content
            from unauthorized use. To enable this protection, you hereby appoint
            Alien Learning and our anti-piracy vendors as your agents for the
            purpose of enforcing copyrights for each of your content, through
            notice and takedown processes (under applicable copyright laws like
            the Digital Millennium Copyright Act) and for other efforts to
            enforce those rights. You grant Alien Learning and our anti-piracy
            vendors primary authority to file notices on your behalf to enforce
            your copyright interests.
          </p>
          <p>
            You agree that Alien Learning and our anti-piracy vendors will
            retain the above rights unless you revoke them by sending an email
            to piracy@alienlearning.com with the subject line: "Revoke
            Anti-Piracy Protection Rights" from the email address associated
            with your account. Any revocation of rights will be effective 48
            hours after we receive it.
          </p>
          <h2>4. Pricing</h2>
          <h3>4.1 Price Setting</h3>
          <p>
            When creating Submitted Content available for purchase on Alien
            Learning, you will be prompted to select a base price ("
            <b>Base Price</b>") for your Submitted Content from a list of
            available price tiers. Alternatively, you may choose to offer your
            Submitted Content for free. As a premium Trainee, you will also
            be given the opportunity to participate in certain promotional
            programs under the terms of our Promotions Policy ("
            <b>Promotional Programs</b>").
          </p>
          <p>
            If you do not opt to participate in any Promotional Programs, we
            will list your Submitted Content for the Base Price or the closest
            local or mobile app equivalent (as detailed below). If you opt to
            participate in a Promotional Program, we may set a different
            discounted price or list price for your Submitted Content as
            described in the Promotions Policy.
          </p>
          <p>
            When a student purchases using a foreign currency, we will convert
            the relevant Base Price or Promotional Program price into the
            student's applicable currency using a system-wide foreign currency
            conversion rate set by Alien Learning and fixed periodically into a
            table of corresponding price tiers by currency ("
            <b>Price Tier Matrix</b>"). Since the Price Tier Matrix is fixed,
            those conversion rates may not be identical to the applicable market
            rate in effect when a transaction is processed. We reserve the right
            to update the Price Tier Matrix at any time. The Price Tier Matrix
            and additional information on Alien Learning's pricing tiers are
            available{" "}
            <a href="https://www.alienlearning.com/support/229605368/">here</a>.
          </p>
          <p>
            When a student purchases through a mobile application, the mobile
            platform provider's pricing matrix will control, and we will choose
            the price tier closest to the applicable Base Price or Promotional
            Program price. Because mobile platforms impose their own currency
            conversion rates, conversions for mobile app prices may not match
            the conversions in the Price Tier Matrix.
          </p>
          <p>
            You give us permission to share your Submitted Content for free with
            our employees, with selected partners, and in cases where we need to
            restore access to accounts who have previously purchased your
            Submitted Content. You understand that you will not receive
            compensation in these cases.
          </p>
          <h3>4.2 Transaction Taxes</h3>
          <p>
            If a student purchases a product or service in a country that
            requires Alien Learning to remit national, state, or local sales or
            use taxes, value added taxes (VAT), or other similar transaction
            taxes ("<b>Transaction Taxes</b>"), under applicable law, we will
            collect and remit those Transaction Taxes to the competent tax
            authorities for those sales. We may increase the sale price at our
            discretion where we determine that such taxes may be due. For
            purchases through mobile applications, applicable Transaction Taxes
            are collected by the mobile platform (such as Apple's App Store or
            Google Play).
          </p>
          <h3>4.3 Promotional Programs</h3>
          <p>
            Alien Learning offers several optional marketing programs
            (Promotional Programs) in which you can choose to participate, as
            detailed in our{" "}
            <a href="https://support.alienlearning.com/hc/en-us/articles/115013339928">
              Promotions Policy
            </a>
            . These programs can help increase your revenue potential on Alien
            Learning by finding the optimal price point for your Submitted
            Content and offering them through subscriptions collections.
          </p>
          <p>
            There is no up-front cost to participate in these programs, and you
            can modify your participation status at any time, though changes you
            make will not apply to currently active campaigns and certain
            programs may have additional requirements on termination.
          </p>
          <h2>5. Payments</h2>
          <h3>5.1 Revenue Share</h3>
          <p>
            When a student purchases your Submitted Content, we calculate the
            gross amount of the sale as the amount actually received by Alien
            Learning from the student ("<b>Gross Amount</b>"). From this, we
            subtract any Transaction Taxes, any mobile platform fees applied to
            mobile provider checkout sales, a 3% service and processing fee
            (except in Japan, where we subtract a 4% fee) for any non-mobile
            provider checkout sales, and any amounts paid to third parties in
            connection with the Promotional Programs to calculate the net amount
            of the sale ("<b>Net Amount</b>").
          </p>
          <p>
            If you have not opted into any of Alien Learning's optional
            Promotional Programs, and except for sales through
            Trainee-generated coupon codes or course referral links as
            described below, your revenue share will be 37% of the Net Amount
            less any applicable deductions, such as student refunds. If we
            change this payment rate, we will provide you 30 days notice using
            prominent means, such as via email or by posting a notice through
            our Services.
          </p>
          <p>
            If you opt into any of the Promotional Programs, the relevant
            revenue share may be different and will be as specified in the{" "}
            <a href="https://support.alienlearning.com/hc/en-us/articles/115013339928">
              Promotions Policy
            </a>
            .
          </p>
          <p>
            Alien Learning makes all Trainee payments in U.S. dollars (USD)
            regardless of the currency with which the sale was made. Alien
            Learning is not responsible for your foreign currency conversion
            fees, wiring fees, or any other processing fees that you may incur.
            Your revenue report will show the sales price (in local currency)
            and your converted revenue amount (in USD).
          </p>
          <h3>5.2 Trainee Coupons and Course Referral Links</h3>
          <p>
            The Alien Learning platform allows you to generate coupon codes and
            referral links to offer certain items of your Submitted Content to
            students at a discount, at Alien Learning's current price, or for
            free, as permitted within the Services. These coupon codes and
            referral links are subject to limits, and you may not sell them on
            third-party websites or otherwise offer them in exchange for
            compensation. Additional information and restrictions on these
            coupon codes and referral links are outlined in our{" "}
            <a href="https://www.alienlearning.com/support/204119748/">
              Trust &amp; Safety policies
            </a>
            .
          </p>
          <p>
            Where a student applies your coupon code or referral link at
            checkout, your revenue share will be 97% of the Net Amount less any
            applicable deductions, such as student refunds.
          </p>
          <h3>5.3 Receiving Payments</h3>
          <p>
            For us to pay you in a timely manner, you must own a PayPal,
            Payoneer, or U.S. bank account (for U.S. residents only) in good
            standing and must keep us informed of the correct email associated
            with your account. You must also provide any identifying information
            or tax documentation (such as a W-9 or W-8) necessary for payment of
            amounts due, and you agree that we have the right to withhold
            appropriate taxes from your payments. We reserve the right to
            withhold payments or impose other penalties if we do not receive
            proper identifying information or tax documentation from you. You
            understand and agree that you are ultimately responsible for any
            taxes on your income.
          </p>
          <p>
            Depending on the applicable revenue share model, payment will be
            made within 45 days of the end of the month in which (a) we receive
            the fee for a course or (b) the relevant course consumption
            occurred.
          </p>
          <p>
            As an Trainee, you are responsible for determining whether you
            are eligible to be paid by a U.S. company. We reserve the right not
            to pay out funds in the event of identified fraud, violations of
            intellectual property rights, or other violations of the law.
          </p>
          <p>
            If we cannot settle funds into your payment account after the period
            of time set forth by your state, country, or other government
            authority in its unclaimed property laws, we may process the funds
            due to you in accordance with our legal obligations, including by
            submitting those funds to the appropriate government authority as
            required by law.
          </p>
          <h3>5.4 Refunds</h3>
          <p>
            You acknowledge and agree that students have the right to receive a
            refund, as detailed in the <a href="/terms/">Terms of Use</a>.
            Trainees will not receive any revenue from transactions for which
            a refund has been granted under the Terms of Use.
          </p>
          <p>
            If a student asks for a refund after we have paid the relevant
            Trainee payment, we reserve the right to either (1) deduct the
            amount of the refund from the next payment sent to the Trainee or
            (2) where no further payments are due to the Trainee or the
            payments are insufficient to cover the refunded amounts, require the
            Trainee to refund any amounts refunded to students for the
            Trainee's Submitted Content.
          </p>
          <h2>6. Trademarks</h2>
          <p>
            While you are a published Trainee and subject to the requirements
            below, you may use our trademarks where we authorize you to do so.
          </p>
          <p>You must:</p>
          <ul>
            <li>
              only use the images of our trademarks that we make available to
              you, as detailed in any guidelines we may publish;
            </li>
            <li>
              only use our trademarks in connection with the promotion and sale
              of your Submitted Content available on Alien Learning or your
              participation on Alien Learning; and
            </li>
            <li>immediately comply if we request that you discontinue use.</li>
          </ul>
          <p>You must not:</p>
          <ul>
            <li>use our trademarks in a misleading or disparaging way;</li>
            <li>
              use our trademarks in a way that implies that we endorse, sponsor,
              or approve of your Submitted Content or services; or
            </li>
            <li>
              use our trademarks in a way that violates applicable law or in
              connection with an obscene, indecent, or unlawful topic or
              material.
            </li>
          </ul>
          <h2>7. Deleting Your Account</h2>
          <p>
            Instructions on how to delete your Trainee account are available{" "}
            <a href="https://www.alienlearning.com/support/229233547/">here</a>.
            We'll use commercially reasonable efforts to make any remaining
            scheduled payments that are owed to you before deleting your
            account. You understand that if students have previously enrolled in
            your Submitted Content, your name and that Submitted Content may
            remain accessible to those students after your account is deleted.
            If you need help or encounter difficulty deleting your account, you
            can contact us via our{" "}
            <a href="/support/requests/new/?type=Trainee">Support Center</a>.
          </p>
          <h2>8. Miscellaneous Legal Terms</h2>
          <h3>8.1 Updating These Terms</h3>
          <p>
            From time to time, we may update these Terms to clarify our
            practices or to reflect new or different practices (such as when we
            add new features), and Alien Learning reserves the right in its sole
            discretion to modify and/or make changes to these Terms at any time.
            If we make any material change, we will notify you using prominent
            means such as by email notice sent to the email address specified in
            your account or by posting a notice through our Services.
            Modifications will become effective on the day they are posted
            unless stated otherwise.
          </p>
          <p>
            Your continued use of our Services after changes become effective
            shall mean that you accept those changes. Any revised Terms shall
            supersede all previous Terms.
          </p>
          <h3>8.2 Translations</h3>
          <p>
            Any version of these Terms in a language other than English is
            provided for convenience and you understand and agree that the
            English language will control if there is any conflict.
          </p>
          <h3>8.3 Relationship Between Us</h3>
          <p>
            You and we agree that no joint venture, partnership, employment,
            contractor, or agency relationship exists between us.
          </p>
          <h3>8.4 Survival</h3>
          <p>
            The following sections shall survive the expiration or termination
            of these Terms: Sections 2 (License to Alien Learning), 3.3
            (Relationship to Other Users), 5.3 (Receiving Payments), 5.4
            (Refunds), 7 (Deleting Your Account), and 8 (Miscellaneous Legal
            Terms).
          </p>
          <h2>9. How to Contact Us</h2>
          <p>
            The best way to get in touch with us is to contact our{" "}
            <a href="/support/requests/new/?type=Trainee">Support Team</a>.
            We'd love to hear your questions, concerns, and feedback about our
            Services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
