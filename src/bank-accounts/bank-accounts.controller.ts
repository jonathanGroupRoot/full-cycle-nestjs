import { Controller, Get, Post, Body, Param, HttpCode } from '@nestjs/common';
import { BankAccountsService } from './bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { TransferBankAccountDto } from './dto/transfer-bank-account.dto';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(@Body() createBankAccountDto: CreateBankAccountDto) {
    return this.bankAccountsService.create(createBankAccountDto);
  }

  @Get()
  findAll() {
    return this.bankAccountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bankAccountsService.findOne(id);
  }

  @HttpCode(204)
  @Post('/trasnfer')
  async transfer(@Body() createTransferBankAccountDto: TransferBankAccountDto) {
    await this.bankAccountsService.transfer({
      amount: createTransferBankAccountDto.amount,
      from: createTransferBankAccountDto.from,
      to: createTransferBankAccountDto.to,
    });
  }
}
