import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Business } from '../business/entities/business.entity';
import { Access } from '../auth/entities/access.entity';
import { BusinessOwner } from '../business_owner/entities/business_owner.entity';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async SendBusinessWelcome(
    business_owner: BusinessOwner,
    business: Business,
    access: Access,
  ) {
    await this.mailerService.sendMail({
      to: business_owner.business_owner_email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Bienvenido a Tarjety!',
      /* template: 'welcome_to_', // `.hbs` extension is appended automatically */
      context: {
        // ✏️ filling curly brackets with content
        business: business_owner.business_owner_email,
      },
      html: ` <h5> Bienvenido a Prospecfy! </h5> <br/>
            <p>Felicidades, Se ha creado tu nuevo usuario en Prospecfy!</p>  <br/>  
            El nombre de su negocio es: ${business.business_name} <br/>
            El correo de acceso: ${access.access_username} <br/>
            y se ha generado una contraseña: ${access.access_password} <br/>
            Recuerda que puedes actualizar tu contraseña cuando quieras! <br/>`,
    });
  }

  async SendRecoveryPassword(access: Access, access_recovery) {
    await this.mailerService.sendMail({
      to: access.access_email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Solicitud para reestablecer contraseña!',
      /* template: 'welcome_to_', // `.hbs` extension is appended automatically */
      context: {
        // ✏️ filling curly brackets with content
        business: access.access_email,
      },
      html: ` <h5> Solicitud para restablecer su contraseña! </h5> <br/>
            <p>Has solicitado reestablecer tu contraseña de Prospecfy!</p>  <br/>  
            Se ha generado el siguiente codigo: ${access_recovery} <br/>
            Recuerda que puedes actualizar tu contraseña cuando quieras! <br/>`,
    });
  }
}
