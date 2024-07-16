import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { sha256 } from 'js-sha256';
import { Observable } from 'rxjs';
import { ISession } from '../../shared/interfaces/session.interface';
import { ILogin } from '../../shared/interfaces/login.interface';
import { crc32 } from 'crc';
import { IServerNonce } from '../../shared/interfaces/serverNonce.interface';
import moment from 'moment';
import { IPasswordEncryption } from '../../shared/interfaces/password-encryption.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public storage!: Storage;
  public userIdentified!: boolean;
  public ID_SESSION!: string;
  public SYSTEM_ID_SESSION!: string;
  public signatureSession!: string;
  public userNameDisplay: string;
  public systemNonce!: string;
  public clientNonce!: string;
  public systemLoginResponse = new EventEmitter<ISession>();
  public passwordFixed = '146a2bf4ac84efd41f08fea59725f7c8fcac5a9a86fa0108a445ac6d9450dba7';

  constructor(
    private _httpClient: HttpClient,
  ) {
    // this.storage = window?.localStorage;
    this.userNameDisplay = '';
  }

  public requestSystemLogin(): void {
    const user = 'gabriel';
    this.passwordFixed = '146a2bf4ac84efd41f08fea59725f7c8fcac5a9a86fa0108a445ac6d9450dba7';

    this.getServerNonce(user).subscribe((res: IServerNonce) => {
      this.systemNonce = res.result;
      if (this.systemNonce.length > 0) {
        this.clientNonce = sha256(moment().toISOString());

        const loginPayload = {
          user: user,
          passwordEncrypted: this.passwordFixed,
          clientNonce: this.clientNonce,
          systemNonce: res.result
        } as ILogin

        this.doLogin(loginPayload).subscribe((res: ISession) => {
          if (res) {
            console.log(res, "res");
          this.systemLoginResponse.emit(res);
          }
        });
      }
    });
  }

    public generateSystemSignatureSession(res: IServerNonce, path: string): string {
      let session = res.result;
      const posicao = session.indexOf('+');
      if (posicao >= 0) {
        this.SYSTEM_ID_SESSION = session.substring(0, posicao);
      }

      const crc32Session = crc32(session);

      const PRIVATE_KEY = crc32(this.passwordFixed, crc32Session);
      const date = new Date;
      const timeStamp = date.getTime();
      const timestampToMiliseconds = Number(timeStamp) * 1000;
      const milisecondHex = timestampToMiliseconds.toString(16);
      const eightDigitMiliseconds = milisecondHex.substring(milisecondHex.length - 8, milisecondHex.length);
      this.signatureSession = this.mountSignatureSession(path, eightDigitMiliseconds, Number(PRIVATE_KEY));
      const dataReturn = parseInt(this.SYSTEM_ID_SESSION, 10).toString(16) + eightDigitMiliseconds + this.signatureSession;
      return dataReturn;
    }

  public getServerNonce(userName: string): Observable<any> { // first step
    const url = `http://192.168.5.4:11117/retaguarda_prospect/auth?UserName=${userName}`;
    return this._httpClient.get(url);
  }

  public getUserNameForDisplay(user: string): string {
    return this.userNameDisplay = user;
  }

  public getClientNonce(dateHour: string): string { // second step
    return sha256(dateHour);
  }

  public passwordEncryption(payload: IPasswordEncryption): string { // thrid step
    const salt = `salt${payload.password}`;
    const hashSalt = sha256(salt);
    const encryptedPassword = sha256(`retaguarda_prospect/${payload.user}${payload.serverNonce}${payload.clientNonce}${payload.user}${hashSalt}`);

    return encryptedPassword;
  }

  public doLogin(payload: ILogin): Observable<any> { // fourth step
    const password = sha256(`retaguarda_prospect${payload.systemNonce}${payload.clientNonce}${payload.user}${payload.passwordEncrypted}`);
    const url = `http://192.168.5.4:11117/retaguarda_prospect/auth?UserName=${payload.user}&Password=${password}&ClientNonce=${payload.clientNonce}`;
    return this._httpClient.get(url);
  }

  public settorageItem(name: string, item: string): any {
    this.storage.setItem(name, JSON.stringify(item));
  }

  // public getLocalStorageItem(item: string): any {
  //  return this.storage?.getItem(item);
  // }

  public getSignatureSession(serverData: ISession, password: string, url: string): string { // fifth step

    let session = serverData.result;
    const posicao = session.indexOf('+');
    if (posicao >= 0) {
      this.ID_SESSION = session.substring(0, posicao);
    }
    const crc32Session = crc32(session);
    const saltPassword = `salt${password}`;
    const hashSaltPassword = sha256(saltPassword);

    const PRIVATE_KEY = crc32(hashSaltPassword, crc32Session);

    const date = new Date;
    const timeStamp = date.getTime();
    const timestampToMiliseconds = Number(timeStamp) * 1000;
    const milisecondHex = timestampToMiliseconds.toString(16);
    const eightDigitMiliseconds = milisecondHex.substring(milisecondHex.length - 8, milisecondHex.length);
    this.signatureSession = this.mountSignatureSession(url, eightDigitMiliseconds, Number(PRIVATE_KEY));
    // let SignatureSessionTwo = crc32('retaguarda_prospect/empresaService/PegarEmpresasFavoritas', crc32(eightDigitMiliseconds, Number(PRIVATE_KEY))).toString(16);
    const dataReturn = parseInt(this.ID_SESSION, 10).toString(16) + eightDigitMiliseconds + this.signatureSession;
    return dataReturn;
  }

  public mountSignatureSession(url: string, eightDigitMiliseconds: string, privateKey: number){
    return crc32(url, crc32(eightDigitMiliseconds, privateKey)).toString(16);
  }

  public createNewAccount(dados: any, signatureSession: string): Observable<any> { // sixsith and final step
    const url = `http://192.168.5.4:11117/retaguarda_prospect/usuarios/CadastrarUsuario?session_signature=${signatureSession}`;
    return this._httpClient.post(url, {dados: dados});
  }

  public isLogged(userLoggedIn: boolean): boolean {
    this.userIdentified = userLoggedIn;
    if (this.userIdentified) {
      return true
    }
    return false;
  }

}
