import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Lead } from './entities/lead.entity';
import { Status } from '../status/entities/status.entity';

@Injectable()
export class LeadService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, lead: Lead) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const status_ = await connection_.manager.find(Status, {
      order: { status_save_date: 'asc' },
    });
    const leadCount = await connection_.manager.count(Lead);
    const leadMaxNumber = await connection_.manager.find(Lead, {
      order: { lead_number_generated: 'DESC' },
    });

    let leadNumberGenerated, codeGenerated, chatCodeGenerated;

    if (leadCount > 0) {
      leadNumberGenerated = leadMaxNumber[0].lead_number_generated + 1;
      codeGenerated = 'Lead #' + leadNumberGenerated;
      chatCodeGenerated = 'Chat #' + leadNumberGenerated;
    } else {
      leadNumberGenerated = 1;
      codeGenerated = 'Lead #' + 1;
      chatCodeGenerated = 'Chat #' + 1;
    }

    lead.lead_number_generated = leadNumberGenerated;
    lead.lead_code_generated = codeGenerated;
    lead.lead_chat_number_generated = leadNumberGenerated;
    lead.lead_chat_code_generated = chatCodeGenerated;

    lead.lead_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    lead.lead_is_delete = false;
    lead.is_customer = false;
    lead.is_leads = true;
    const lead_ = connection_.manager.create(Lead, lead);
    lead_.status = status_[0];
    const lead_save = await connection_.manager.save(Lead, lead_);
    /* const timeline = new Timeline();
    timeline.timelines_description = 'Se ha creado el lead';
    await connection_.manager.save(Timeline, timeline); */
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_save,
    };
  }

  async createCustomer(db_access: string, lead: Lead) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const status_ = await connection_.manager.find(Status, {
      order: {
        status_save_date: 'ASC',
      },
    });
    const lead_length = await connection_.manager.find(Lead);
    if (lead_length.length > 0) {
      const lead_max_number = await connection_.manager.find(Lead, {
        order: {
          lead_number_generated: 'DESC',
        },
      });
      const number_generated = lead_max_number[0].lead_number_generated;
      lead.lead_number_generated = number_generated + 1;
      const code_generated = 'Client #' + (number_generated + 1);
      lead.lead_code_generated = code_generated;
    } else {
      lead.lead_number_generated = 0 + 1;
      const code_generated = 'Client #' + (0 + 1);
      lead.lead_code_generated = code_generated;
    }

    lead.lead_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    lead.lead_is_delete = false;
    lead.is_customer = true;
    lead.is_leads = false;
    const lead_ = connection_.manager.create(Lead, lead);
    lead_.status = status_[0];
    const lead_save = await connection_.manager.save(Lead, lead_);
    /* const timeline = new Timeline();
    timeline.timelines_description = 'Se ha creado el lead';
    await connection_.manager.save(Timeline, timeline); */
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    lead_uid: string,
    lead: Lead,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const status_ = await connection_.manager.findOne(Status, {
      where: {
        status_uid: lead.status_uid,
      },
    });

    lead.lead_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    const lead_ = connection_.manager.create(Lead, lead);
    lead_.status = status_;
    await connection_.manager.update(Lead, lead_uid, lead_);
    const lead_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      lead_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_find,
    };
  }

  async FindLeads(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const lead_find = await connection_.manager.find(Lead, {
      relations: {
        follow_up: true,
        status: {
          business: {
            business_owner: true,
          },
        },
        sale: true,
      },
      where: {
        is_leads: true,
        status: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        lead_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_find,
    };
  }

  async FindCustomer(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const lead_find = await connection_.manager.find(Lead, {
      relations: {
        follow_up: true,
        status: {
          business: {
            business_owner: true,
          },
        },
        sale: true,
      },
      where: {
        is_customer: true,
        status: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        lead_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_find,
    };
  }

  async FindAll(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const lead_find = await connection_.manager.find(Lead, {
      relations: {
        follow_up: true,
        status: {
          business: {
            business_owner: true,
          },
        },
        sale: true,
      },
      where: {
        status: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        lead_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_find,
    };
  }

  async FindActiveLeads(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const lead_find = await connection_.manager.find(Lead, {
      relations: {
        follow_up: true,
        status: {
          business: {
            business_owner: true,
          },
        },
        sale: true,
      },
      where: {
        is_leads: true,
        lead_is_delete: false,
        status: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        lead_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_find,
    };
  }

  async FindActiveCustomer(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const lead_find = await connection_.manager.find(Lead, {
      relations: {
        follow_up: true,
        status: {
          business: {
            business_owner: true,
          },
        },
        sale: true,
      },
      where: {
        is_customer: true,
        lead_is_delete: false,
        status: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        lead_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_find,
    };
  }

  async FindInactiveLeads(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const lead_find = await connection_.manager.find(Lead, {
      relations: {
        follow_up: true,
        status: {
          business: {
            business_owner: true,
          },
        },
        sale: true,
      },
      where: {
        is_leads: true,
        lead_is_delete: true,
        status: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        lead_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_find,
    };
  }

  async FindInactiveCustomer(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const lead_find = await connection_.manager.find(Lead, {
      relations: {
        follow_up: true,
        status: {
          business: {
            business_owner: true,
          },
        },
        sale: true,
      },
      where: {
        is_customer: true,
        lead_is_delete: true,
        status: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        lead_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    lead_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const lead_find = await connection_.manager.findOne(Lead, {
      relations: {
        follow_up: true,
        status: {
          business: {
            business_owner: true,
          },
        },
        sale: true,
      },
      where: {
        lead_uid: lead_uid,
        status: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: lead_find,
    };
  }
}
