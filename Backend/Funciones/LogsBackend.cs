using System;
using System.IO;

namespace Backend.Funciones
{
  public class LogsBackend
    { 

          public void SetLog(String texto)
        {
            string filepath = AppDomain.CurrentDomain.BaseDirectory + @"\log.txt";
            bool exists = System.IO.File.Exists(filepath);
            if (exists == false){
              FileStream nsf = new FileStream(filepath, FileMode.Create);
              StreamWriter nm_streamWriter = new StreamWriter(nsf);
               nm_streamWriter.Close();
            }
                FileStream sf = new FileStream(filepath, FileMode.Append);
                StreamWriter m_streamWriter = new StreamWriter(sf);
                m_streamWriter.WriteLine(texto);
                m_streamWriter.Close();

        }

        private void SetString(long idEmpresa, string cnnString)
        {

            string FolderPath = AppDomain.CurrentDomain.BaseDirectory + @"\ClientKeyString";
            string filePath = FolderPath + @"\" + idEmpresa + ".txt";

            bool folderExists = Directory.Exists(FolderPath);
            if (!folderExists)
            {
                Directory.CreateDirectory(FolderPath);
            }

           bool exists = System.IO.File.Exists(filePath);
            if (exists == false)
            {
                FileStream nsf = new FileStream(filePath, FileMode.Create);
                StreamWriter nm_streamWriter = new StreamWriter(nsf);
                nm_streamWriter.WriteLine(cnnString);
                nm_streamWriter.Close();
            }
         }


        /*

        public string GetString(long ID_EMPRESA)
        {

            string filepath = AppDomain.CurrentDomain.BaseDirectory + @"\ClientKeyString\" + ID_EMPRESA + ".txt";
            string CliStr="-";

            bool exists;
            
            exists= System.IO.File.Exists(filepath);
            if (exists == false)
            {
                cls_MySQL clsmysql = new cls_MySQL();
                mdlClientStrnig ClientString = new mdlClientStrnig();
                ClientString = clsmysql.GetString(ID_EMPRESA);
                string cstr = ClientString.STRING;
                SetString(ID_EMPRESA, cstr);
                CliStr = cstr;
             }

            exists = System.IO.File.Exists(filepath);
            if (exists == true)
            {
                FileStream sf = new FileStream(filepath, FileMode.Open);
                StreamReader mr = new StreamReader(sf);
                CliStr = mr.ReadToEnd();
                mr.Close();
            }

            return CliStr;
        }


        public string GetEsquema(long ID_EMPRESA)
        {
                cls_MySQL clsmysql = new cls_MySQL();
                mdlClientStrnig ClientString = new mdlClientStrnig();
                ClientString = clsmysql.GetString(ID_EMPRESA);
                return ClientString.ESQUEMA;
        }

    */
    }
}

