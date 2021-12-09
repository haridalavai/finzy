import {
  FiTypes,
  Bonds,
  Aif,
  Cd,
  Cis,
  Cp,
  CreditCard,
  Debentures,
  Deposit,
  Epf,
  Equities,
  Etf,
  GovtSecurities,
  Idr,
  InsurancePolicies,
  Invit,
  MutualFunds,
  Nps,
  Ppf,
  RecurringDeposit,
  Reit,
  Sip,
  TermDeposit,
  Ulip,
  Summary,
  DistributionEntity,
} from "@linklab-test-p/common";
import { FiStructured } from "../models/fi_Structured";

// import { fi } from "./fi-dummy";

export default class FiAnaliser {
  netWorth: number = 0;
  public async analyseFi(fi: any) {
    let bonds: Bonds[] = [];
    let deposits: Deposit[] = [];
    let recurringDeposits: RecurringDeposit[] = ([] = []);
    let termDeposits: TermDeposit[] = [];
    let creditCards: CreditCard[] = [];
    let cds: Cd[] = [];
    let idrs: Idr[] = [];
    let ulips: Ulip[] = [];
    let epfs: Epf[] = [];
    let ppfs: Ppf[] = [];
    let mutualFunds: MutualFunds[] = [];
    let debentures: Debentures[] = [];
    let etfs: Etf[] = [];
    let nps: Nps[] = [];
    let govtSecurities: GovtSecurities[] = [];
    let cps: Cp[] = [];
    let reits: Reit[] = [];
    let invits: Invit[] = [];
    let equities: Equities[] = [];
    let ciss: Cis[] = [];
    let aifs: Aif[] = [];
    let insurancePolicies: InsurancePolicies[] = [];
    let sips: Sip[] = [];
    let distribution: DistributionEntity[] = [];

    await fi.fi_raw.map(async (fi: any) => {
      switch (fi.account.type) {
        case FiTypes.aif:
          this.handleAif(fi, aifs, distribution);
          break;
        case FiTypes.bonds:
          this.handleBONDS(fi, bonds, distribution);
          break;
        case FiTypes.deposit:
          this.handleDeposit(fi, deposits, distribution);
          break;
        case FiTypes.cd:
          this.handleCd(fi, cds, distribution);
          break;
        case FiTypes.cis:
          this.handleCis(fi, ciss, distribution);
          break;
        case FiTypes.cp:
          this.handleCp(fi, cps, distribution);
          break;
        case FiTypes.credit_card:
          this.handleCreditCard(fi, creditCards, distribution);
          break;
        case FiTypes.debentures:
          this.handleDebentures(fi, debentures, distribution);
          break;
        case FiTypes.epf:
          this.handleEpf(fi, epfs, distribution);
          break;
        case FiTypes.equities:
          this.handleEquities(fi, equities, distribution);
          break;
        case FiTypes.etf:
          this.handleEtf(fi, etfs, distribution);
          break;

        case FiTypes.govt_securities:
          this.handleGovtSecurities(fi, govtSecurities, distribution);
          break;

        case FiTypes.idr:
          this.handleIdr(fi, idrs, distribution);
          break;

        case FiTypes.insurance_policies:
          this.handleInsurancePolicy(fi, insurancePolicies, distribution);
          break;

        case FiTypes.invit:
          this.handleInvit(fi, invits, distribution);
          break;

        case FiTypes.mutual_funds:
          this.handleMutualFunds(fi, mutualFunds, distribution);
          break;

        case FiTypes.nps:
          this.handleNps(fi, nps, distribution);
          break;

        case FiTypes.ppf:
          this.handlePpf(fi, ppfs, distribution);
          break;
        case FiTypes.recurring_deposit:
          this.handleRecurringDeposit(fi, recurringDeposits, distribution);
          break;
        case FiTypes.reit:
          this.handleReit(fi, reits, distribution);
          break;
        case FiTypes.sip:
          this.handleSpi(fi, sips, distribution);
          break;
        case FiTypes.term_deposit:
          this.handleTermDeposit(fi, termDeposits, distribution);
          break;
        case FiTypes.ulip:
          this.handleUlip(fi, ulips, distribution);
          break;

        default:
          break;
      }
    });

    const summary: Summary = {
      summary: {
        consentId: fi.consent_id,
        netWorth: {
          netWorth: this.netWorth.toString(),
          distribution: distribution,
        },
      },
    };
    const fiStructured: FiStructured = {
      summary: summary,

      accounts: {
        BONDS: bonds,
        DEPOSITS: deposits,
        RECURRING_DEPOSIT: recurringDeposits,
        TERM_DEPOSIT: termDeposits,
        CREDIT_CARD: creditCards,
        CD: cds,
        IDR: idrs,
        ULIP: ulips,
        EPF: epfs,
        PPF: ppfs,
        MUTUAL_FUNDS: mutualFunds,
        DEBENTURES: debentures,
        ETF: etfs,
        NPS: nps,
        GOVT_SECURITIES: govtSecurities,
        CP: cps,
        REIT: reits,
        INVIT: invits,
        EQUITIES: equities,
        CIS: ciss,
        AIF: aifs,
        INSURANCE_POLICIES: insurancePolicies,
        SIP: sips,
      },
    };

    return fiStructured;
  }
  handleAif(fi: any, aifs: Aif[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.aif,
    };
    distribution.push(distributionEntity);
    aifs.push(fi);
  }
  handleIdr(fi: any, idrs: Idr[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.idr,
    };
    distribution.push(distributionEntity);
    idrs.push(fi);
  }
  handleInsurancePolicy(
    fi: any,
    insurancePolicies: InsurancePolicies[],
    distribution: DistributionEntity[]
  ) {
    insurancePolicies.push(fi);
  }

  handleInvit(fi: any, invits: Invit[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.invit,
    };
    distribution.push(distributionEntity);
    invits.push(fi);
  }

  handleMutualFunds(
    fi: any,
    mutualFunds: MutualFunds[],
    distribution: DistributionEntity[]
  ) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.mutual_funds,
    };
    distribution.push(distributionEntity);
    mutualFunds.push(fi);
  }
  handleNps(fi: any, nps: Nps[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.nps,
    };
    distribution.push(distributionEntity);
    nps.push(fi);
  }

  handlePpf(fi: any, ppfs: Ppf[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currenBalance);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currenBalance,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.ppf,
    };
    distribution.push(distributionEntity);
    ppfs.push(fi);
  }

  handleRecurringDeposit(
    fi: any,
    recurringDeposits: RecurringDeposit[],
    distribution: DistributionEntity[]
  ) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.recurring_deposit,
    };
    distribution.push(distributionEntity);
    recurringDeposits.push(fi);
  }

  handleReit(fi: any, reits: Reit[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.reit,
    };
    distribution.push(distributionEntity);
    reits.push(fi);
  }

  handleSpi(fi: any, sips: Sip[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.sip,
    };
    distribution.push(distributionEntity);
    sips.push(fi);
  }

  handleTermDeposit(
    fi: any,
    termDeposits: TermDeposit[],
    distribution: DistributionEntity[]
  ) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.term_deposit,
    };
    distribution.push(distributionEntity);
    termDeposits.push(fi);
  }

  handleUlip(fi: any, ulips: Ulip[], distribution: DistributionEntity[]) {
    ulips.push(fi);
  }

  handleCis(fi: any, ciss: Cis[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.cis,
    };
    distribution.push(distributionEntity);
    ciss.push(fi);
  }

  handleCp(fi: any, cps: Cp[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.cp,
    };
    distribution.push(distributionEntity);
    cps.push(fi);
  }
  handleCreditCard(
    fi: any,
    creditCards: CreditCard[],
    distribution: DistributionEntity[]
  ) {
    creditCards.push(fi);
  }
  handleDebentures(
    fi: any,
    debentures: Debentures[],
    distribution: DistributionEntity[]
  ) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.debentures,
    };
    distribution.push(distributionEntity);
    debentures.push(fi);
  }
  handleEpf(fi: any, epfs: Epf[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentBalance);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentBalance,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.epf,
    };
    distribution.push(distributionEntity);
    epfs.push(fi);
  }
  handleEquities(
    fi: any,
    equities: Equities[],
    distribution: DistributionEntity[]
  ) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.equities,
    };
    distribution.push(distributionEntity);

    equities.push(fi);
  }
  handleEtf(fi: any, etfs: Etf[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.etf,
    };
    distribution.push(distributionEntity);

    etfs.push(fi);
  }
  handleGovtSecurities(
    fi: any,
    govtSecurities: GovtSecurities[],
    distribution: DistributionEntity[]
  ) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.govt_securities,
    };
    distribution.push(distributionEntity);

    govtSecurities.push(fi);
  }
  handleCd(fi: any, cds: Cd[], distribution: DistributionEntity[]) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.cd,
    };
    distribution.push(distributionEntity);

    cds.push(fi);
  }

  private handleDeposit(
    fi: any,
    deposits: Deposit[],
    distribution: DistributionEntity[]
  ) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentBalance);
    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentBalance,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.deposit,
    };
    distribution.push(distributionEntity);

    deposits.push(fi);
  }

  private handleBONDS(
    fi: Bonds,

    BONDS: Bonds[],
    distribution: DistributionEntity[]
  ) {
    this.netWorth = this.netWorth + Number(fi.account.summary.currentValue);

    const distributionEntity: DistributionEntity = {
      amount: fi.account.summary.currentValue,
      maskedAccountNumber: fi.account.maskedAccNumber,
      type: FiTypes.bonds,
    };
    distribution.push(distributionEntity);
    BONDS.push(fi);
  }
}
