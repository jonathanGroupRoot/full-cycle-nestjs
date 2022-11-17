import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto';
import { BankAccount } from './entities/bank-account.entity';

@Injectable()
export class BankAccountsService {
  constructor(
    @InjectRepository(BankAccount)
    private readonly banckAccountRepository: Repository<BankAccount>,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto) {
    const bankAccount = this.banckAccountRepository.create({
      account_number: createBankAccountDto.account_number,
      balance: createBankAccountDto.balance,
    });

    await this.banckAccountRepository.insert(bankAccount);

    return bankAccount;
  }

  async findAll() {
    return this.banckAccountRepository.find();
  }

  async findOne(id: string) {
    return this.banckAccountRepository.findOneBy({ id });
  }

  async transfer(createTransferBankAccountDto: TransferBankAccountDto) {
    try {
      const fromAccount = await this.banckAccountRepository.findOneBy({
        account_number: createTransferBankAccountDto.from,
      });
      const toAccount = await this.banckAccountRepository.findOneBy({
        account_number: createTransferBankAccountDto.to,
      });

      fromAccount.balance -= createTransferBankAccountDto.amount;
      toAccount.balance += createTransferBankAccountDto.amount;

      this.banckAccountRepository.save(fromAccount);
      this.banckAccountRepository.save(toAccount);
    } catch (error) {
      throw error;
    }
  }
}
