using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
using System.Text;
using FinalProject.Models;
using FinalProj.Models;
using FinalProj.Models.DAL;

/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{
    public SqlDataAdapter da;
    public DataTable dt;

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }

    //---------------------------------------------------------------------------------
    // Create the SqlCommand
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

        return cmd;
    }

    //--------------------------------------------------------------------------------------------------
    // These methods are to Person 
    //--------------------------------------------------------------------------------------------------
    // קוראת את כל הכוח אדם מהטבלה (כאשר האימייל הוא לא נאל) 
    public List<Person> getPersons()
    {
        List<Person> personList = new List<Person>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Person WHERE Email IS NOT NULL";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Person p = new Person();

                p.EmpFirstName = (string)dr["EmpFirstName"];
                p.EmpLastName = (string)dr["EmpLastName"];
                p.CellPhone = (int)dr["cellPhone"];
                p.Email = (string)dr["Email"];
                p.DepartmnetDepartmentCode = (int)dr["DepartmnetDepartmentCode"];
                p.EmpCode = (int)dr["EmpCode"];
                p.IsActive = Convert.ToBoolean(dr["IsActive"]);
                p.StudyingStartyear = (int)dr["StudyingStartyear"];
                p.ActiveTillYear = (int)dr["ActiveTillYear"];
                p.IsEmployee = (bool)dr["ISEMPLOYEE"];




                personList.Add(p);
            }

            //return personList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }


        return personList;

    }
    // הכנסת כוח אדם חדש לטבלת פרסון
    public int insertPerson(Person person)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertToPersonCommand(person);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String
    //--------------------------------------------------------------------
    private String BuildInsertToPersonCommand(Person person)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        sb.AppendFormat("Values('{0}', '{1}' ,{2}, '{3}',{4},'{5}', '{6}' ,'{7}', '{8}')", person.EmpFirstName, person.EmpLastName, person.CellPhone, person.Email, person.DepartmnetDepartmentCode, person.IsActive, person.ActiveTillYear, person.StudyingStartyear, person.IsEmployee);
        String prefix = "INSERT INTO Person" + "(EmpFirstName, EmpLastName, cellPhone, Email, DepartmnetDepartmentCode,IsActive,ActiveTillYear,StudyingStartyear,IsEmployee) ";
        command = prefix + sb.ToString();

        return command;
    }

    // עדכון כוח אדם
    public int PersonUpdate(Person person)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdatePersonCommand(person);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String
    //--------------------------------------------------------------------
    private String BuildUpdatePersonCommand(Person person)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string


        command = @"UPDATE Person Set EmpFirstName=" + "'" + person.EmpFirstName + "'" + ", EmpLastName=" + "'" + person.EmpLastName + "'" + ", CellPhone=" + "'" + person.CellPhone + "'" + ", DepartmnetDepartmentCode=" + "'" + person.DepartmnetDepartmentCode + "', Email=" + "'" + person.Email + "'" +
            ", IsActive=" + "'" + person.IsActive + "'" + ", ActiveTillYear=" + "'" + person.ActiveTillYear + "'" + ", StudyingStartyear=" + "'" + person.StudyingStartyear + "'" + ", IsEmployee=" + "'" + person.IsEmployee + "'" + "where EmpCode=" + "'" + person.EmpCode + "'";




        return command;
    }

    // פונקצייה זו מוחקת כוח אדם ספציפי באמצעות הפיכת האימייל לערך של נאל 
    public int PersonDelete(Person P)

    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }


        String cStr = BuildDeletePersonCommand(P);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildDeletePersonCommand(Person P)
    {
        String command;

        command = @"UPDATE Person Set Email = NULL WHERE Email = " + "'" + P.Email + "'";

        return command;
    }

    //--------------------------------------------------------------------------------------------------
    // These methods are to Task
    //--------------------------------------------------------------------------------------------------

    // קריאה מטבלת סוגי המשימות כאשר שם סוג המשימה לא נאל
    public List<Task> getTasks()
    {
        List<Task> personListt = new List<Task>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Task WHERE TaskName IS NOT NULL ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Task t = new Task();

                t.TaskName = (string)dr["TaskName"];
                t.TaskNo = (int)dr["TaskNo"];
                t.Description = (string)dr["Description"];

                personListt.Add(t);
            }

            return personListt;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }

    }

    // הכנסת סוג משימה חדש לטבלת סוגי משימות
    public int taskInsert(Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandTask(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandTask(Task t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}')", t.TaskName, t.Description);
        String prefix = "INSERT INTO Task " + "(TaskName, " + "Description)";
        command = prefix + sb.ToString();

        return command;
    }
    // פונקצייה זו מוחקת סוג משימה ספציפי באמצעות הפיכת שם סוג המשימה לערך של נאל 
    public int DeleteTask(Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandTask(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildDeleteCommandTask(Task t)
    {
        String command;

        command = @"UPDATE Task Set TaskName = NULL WHERE TaskName = " + "'" + t.TaskName + "'";

        return command;
    }

    // עדכון סוג משימה
    public int UpdateTask(Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateTaskCommand(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String
    //--------------------------------------------------------------------
    private String BuildUpdateTaskCommand(Task t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string



        command = @"UPDATE Task Set TaskName=" + "'" + t.TaskName + "'" + ", Description=" + "'" + t.Description + "'" + "where TaskNo=" + "'" + t.TaskNo + "'";



        return command;
    }

    //--------------------------------------------------------------------------------------------------
    //  These methods are to EventType
    //--------------------------------------------------------------------------------------------------

    // קריאה של כל סוגי האירועים כאשר שם סוג האירוע הוא לא נאל
    public List<Event_Type> GetEvent_Type()
    {
        List<Event_Type> Event_TypeList = new List<Event_Type>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select * from [Event_Type] where EventName IS NOT NULL";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Event_Type Et = new Event_Type();

                // v.EmployeeEmpCode = (int)dr["EmployeeEmpCode"];
                Et.EventCode = (int)(dr["EventCode"]);
                Et.EventName = (string)(dr["EventName"]);


                Event_TypeList.Add(Et);
            }

            return Event_TypeList;
        }
        catch (Exception ex)
        {
            // write to log
           throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }
    // הכנסת סוג אירוע חדש
    public int Event_TypeInsert(Event_Type Et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertEventsCommand(Et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildInsertEventsCommand(Event_Type Et)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}')", Et.EventName);
        String prefix = "INSERT INTO [Event_Type] " + "(EventName) ";
        command = prefix + sb.ToString();
        //



        return command;
    }


    // עדכון סוג אירוע
    public int Event_TypeUpdate(Event_Type Et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateEventTypeCommand(Et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildUpdateEventTypeCommand(Event_Type Et)
    {
        String command;

        command = @"UPDATE Event_Type Set EventName = '" + Et.EventName + "' WHERE EventCode ='" + Et.EventCode + "'";

        return command;
    }
    // מחיקת סוג אירוע
    public int DeleteEvent_Type(Event_Type t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandEventType(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildDeleteCommandEventType(Event_Type t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"DELETE FROM Event_Type WHERE EventCode= '" + t.EventCode + "'";

        return command;
    }

    //--------------------------------------------------------------------------------------------------
    // These methods are to EquipmentType
    //--------------------------------------------------------------------------------------------------

    // קריאה מטבלת סוגי אירועים כאשר שם סוג האירוע הוא לא נאל
    public List<EquipmentType> GetEquipmentType()
    {
        List<EquipmentType> ETlist = new List<EquipmentType>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM EquipmentType WHERE (Name IS NOT NULL) ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                EquipmentType ET = new EquipmentType();
                ET.Code = (int)dr["Code"];
                ET.Name = (string)dr["Name"];
                ET.Quantity = (int)dr["Quantity"];
                ETlist.Add(ET);
            }

            return ETlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    // הכנסה של סוג ציוד חדש
    public int InsertEqType(EquipmentType EqType)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertEqTypeCommand(EqType);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildInsertEqTypeCommand(EquipmentType EqType)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}',{1})", EqType.Name, EqType.Quantity);
        String prefix = "INSERT INTO EquipmentType" + "(Name," + " Quantity) ";
        command = prefix + sb.ToString();

        return command;
    }

    // פונקצייה זו מוחקת סוג ציוד ספציפי באמצעות הפיכת שם סוג הציוד לערך של נאל 
    public int EquipmentTypeDelete(EquipmentType Eq)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteEqTypeCommand(Eq);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildDeleteEqTypeCommand(EquipmentType Eq)
    {
        String command;

        command = @"UPDATE EquipmentType Set Name = NULL WHERE Name = " + "'" + Eq.Name + "'";

        return command;
    }

    // עדכון סוג ציוד
    public int UpdateEquipment(EquipmentType e)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateCommandEquipment(e);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildUpdateCommandEquipment(EquipmentType EqType)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"UPDATE EquipmentType Set Name=" + "'" + EqType.Name + "'" + ", Quantity= '" + EqType.Quantity + "' where Code= '" + EqType.Code + "'";

        return command;
    }
    //Event type Task..............................

    // קריאת כל סוגי משימות שמשויכות לסוג אירוע
    public List<Event_Type_Task> GetEvent_Type_Task()
    {
        List<Event_Type_Task> ETlist = new List<Event_Type_Task>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Event_Type_Task";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Event_Type_Task ET = new Event_Type_Task();
                ET.Event_TypeEventCode = (int)dr["Event_typeEventCode"];
                ET.TaskTaskNo = (int)dr["TaskTaskNo"];
                ETlist.Add(ET);
            }

            return ETlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    //insert
    // הכנסת סוג משימה שמשויכות לסוג אירוע
    public int taskInsertEventType(Event_Type_Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandTaskEventType(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandTaskEventType(Event_Type_Task t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}')", t.Event_TypeEventCode, t.TaskTaskNo);
        String prefix = "INSERT INTO Event_Type_Task " + "(Event_TypeEventCode, " + "TaskTaskNo)";
        command = prefix + sb.ToString();

        return command;
    }
    // מחיקת סוג משימה שמשוייכת לסוג אירוע
    public int DeleteEvent_Type_Task(Event_Type_Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandTaskEventType(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildDeleteCommandTaskEventType(Event_Type_Task t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"DELETE FROM Event_Type_Task WHERE TaskTaskNo= '" + t.TaskTaskNo + "' and Event_TypeEventCode= '" + t.Event_TypeEventCode + "'";

        return command;
    }
    // קריאת סוגי ציוד שמשוייכים לסוג אירוע
    public List<Event_Type_EquipmentType> GetEvent_Type_EquipmentType()
    {
        List<Event_Type_EquipmentType> ETlist = new List<Event_Type_EquipmentType>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Event_Type_EquipmentType";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Event_Type_EquipmentType ET = new Event_Type_EquipmentType();
                ET.Event_TypeEventCode = (int)dr["Event_TypeEventCode"];
                ET.EquipmentTypeCode = (int)dr["EquipmentTypeCode"];
                ETlist.Add(ET);
            }

            return ETlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    // הכנסת סוג ציוד שמשוייך לסוג אירוע
    public int EquipmentInsertEventType(Event_Type_EquipmentType t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandEquipmentEventType(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildInsertCommandEquipmentEventType(Event_Type_EquipmentType t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}')", t.Event_TypeEventCode, t.EquipmentTypeCode);
        String prefix = "INSERT INTO Event_Type_EquipmentType " + "(Event_TypeEventCode, " + "EquipmentTypeCode)";
        command = prefix + sb.ToString();

        return command;
    }
    // מחיקת סוג ציוד שמשוייך לסוג אירוע
    public int DeleteEvent_Type_EquipmentType(Event_Type_EquipmentType et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandEventTypeEquipmentType(et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildDeleteCommandEventTypeEquipmentType(Event_Type_EquipmentType et)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"DELETE FROM Event_Type_EquipmentType WHERE EquipmentTypeCode='" + et.EquipmentTypeCode + "' and Event_TypeEventCode='" + et.Event_TypeEventCode + "'";

        return command;
    }

    ///////Actual Task
    // הכנסת משימה בפועל שלא משוייכת לאירוע 

    public int InsertActual_Task(Task_Person t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandActual_Task(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandActual_Task(Task_Person t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}', '{2}','{3}','{4}','{5}','{6}')", t.TaskTaskNo, t.PersonEmpCode, t.exceutionDate, t.FromHour, t.ToHour, t.ReportedByPerson, t.ApprovedByManager);
        String prefix = "INSERT INTO Task_Person " + "(TaskTaskNo, " + "PersonEmpCode, " + "exceutionDate, " + " FromHour, " + " ToHour, " + " ReportedByPerson, " + " ApprovedByManager )";
        command = prefix + sb.ToString();
        return command;
    }

    // מחיקת משימה בפועל שלא משוייכת לאירוע
    public int DeleteTask_Person(Task_Person TP)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteTask_PersonCommand(TP);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildDeleteTask_PersonCommand(Task_Person Et)
    {
        String command;

        command = @"delete from Task_Person where TaskTaskNo= '" + Et.TaskTaskNo + "' and PersonEmpCode= '"+Et.PersonEmpCode+"' and FromHour= '"+Et.FromHour+"'";
        //DELETE FROM table_name WHERE condition;
        return command;
    }

    // קריאת משימות בפועל שלא משוייכות לאירוע מטבלת טאסק פרסון
    public List<Task_Person> GetTasks_Persons()
    {
        List<Task_Person> TPlist = new List<Task_Person>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Task_Person";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Task_Person TP = new Task_Person();
                TP.TaskTaskNo = (int)dr["TaskTaskNo"];
                TP.PersonEmpCode = (int)dr["PersonEmpCode"];
                TP.exceutionDate = (string)dr["exceutionDate"];
                TP.FromHour = (double)dr["FromHour"];
                TP.ToHour = (double)dr["ToHour"];
                TP.ReportedByPerson = (bool)dr["ReportedByPerson"];
                TP.ApprovedByManager = (bool)dr["ApprovedByManager"];
                TPlist.Add(TP);
            }

            return TPlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }
    //.......................................RoleCode....................................

    // קריאה מטבלת התפקידים של עובדי האגודה שמשוייכת לעובדים
    public List<Role_Employee> getRole_Employees()

    {
        List<Role_Employee> rlist = new List<Role_Employee>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Role_Employee";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Role_Employee ET = new Role_Employee();
                ET.RoleCode = (int)dr["RoleCode"];
                ET.EmployeeEmpCode = (int)dr["EmployeeEmpCode"];
                rlist.Add(ET);
            }

            return rlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }
    //post
    // הכנסת תפקיד חדש לטבלת התפקידים של עובדי האגודה

    public int insertRole_Employees(Role_Employee t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandRole_Employee(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandRole_Employee(Role_Employee t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}')", t.RoleCode, t.EmployeeEmpCode);
        String prefix = "INSERT INTO Role_Employee " + "(RoleCode, " + "EmployeeEmpCode)";
        command = prefix + sb.ToString();

        return command;
    }
    //put

    // עדכון תפקיד ושיוכו לעובד חדש בטבלת תפקידים של עובדי האגודה
    public int Role_EmployeeUpdate(Role_Employee Et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateRole_EmployeeCommand(Et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildUpdateRole_EmployeeCommand(Role_Employee Et)
    {
        String command;

        command = @"UPDATE Role_Employee Set RoleCode = '" + Et.RoleCode + "' WHERE EmployeeEmpCode= '" + Et.EmployeeEmpCode + "'";

        return command;
    }

    // מחיקת תפקיד מטבלת התפקידים לפי קוד עובד
    public int Delete_Role_Employee(Role_Employee et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandRole_Employee(et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildDeleteCommandRole_Employee(Role_Employee et)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"delete from Role_Employee where EmployeeEmpCode= '" + et.EmployeeEmpCode + "'";

        return command;
    }

    //////////////GET Role

    // קריאה מטבלת תפקידים
    public List<Role> getRoles()
    {
        List<Role> Rlist = new List<Role>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Role";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Role R = new Role();
                R.RoleCode = (int)dr["RoleCode"];
                R.RoleName = (string)dr["RoleName"];
                R.description = (string)dr["description"];
                Rlist.Add(R);

            }

            return Rlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    /////////////Role Insert

    // הכנסת תפקיד חדש
    public int InsertRole(Role r)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandRole(r);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandRole(Role r)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}','{2}')", r.RoleCode, r.RoleName, r.description);
        String prefix = "INSERT INTO Role " + "(RoleCode, " + "RoleName, " + "description )";
        command = prefix + sb.ToString();

        return command;
    }


    ///////////////// PUT Role

    // עדכון טבלת תפקידים
    public int UpdateRole(Role role)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateRoleCommand(role);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)

        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildUpdateRoleCommand(Role role)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string


        command = @"UPDATE Role Set RoleName= '" + role.RoleName + "', description= " + "'" + role.description + "'" + " WHERE RoleCode= " + "'" + role.RoleCode + "'";

        //command = @"UPDATE Task Set TaskName=" + "'" + t.TaskName + "'" + ", Description=" + "'" + t.Description + "'" + "where TaskNo=" + "'" + t.TaskNo + "'";


        return command;
    }
   
    ///////////////EmpInfoRole///////////////////////

    // קריאת תפקידי עובדי האגודה עם הפרטים שלהם
    public List<EmpInfoRoles> GetEmpInfoRoles()
    {
        List<EmpInfoRoles> Rlist = new List<EmpInfoRoles>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select P.EmpCode,P.EmpFirstName,P.EmpLastName,P.cellPhone,P.Email,P.DepartmnetDepartmentCode,RO.RoleName from [dbo].[Person]  p inner join [dbo].[Role_Employee]  R on p.[EmpCode]=R.[EmployeeEmpCode]inner join[dbo].[Role] ro on ro.RoleCode=R.RoleCode where P.Email != 'NULL'";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                EmpInfoRoles R = new EmpInfoRoles();
                R.EmpCode = (int)dr["EmpCode"];
                R.EmpFirstName = (string)dr["EmpFirstName"];
                R.EmpLastName = (string)dr["EmpLastName"];
                R.cellPhone = (int)dr["cellPhone"];
                R.Email = (string)dr["Email"];
                R.DepartmnetDepartmentCode = (int)dr["DepartmnetDepartmentCode"];
                R.RoleName = (string)dr["RoleName"];
                Rlist.Add(R);

            }

            return Rlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    //  נועד לדוח השעות הכולל של כל המתנדבים/ פעילים באגודה ומביא לנו את כל המשימות שאינן משוייכות לאירוע

    public List<TotalTasksPer> GetTotalTasksPer()
    {
        List<TotalTasksPer> TPlist = new List<TotalTasksPer>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select * from Task_Person tp inner join Task t on tp.TaskTaskNo= t.TaskNo inner join person p on tp.PersonEmpCode= p.EmpCode where t.TaskName!= 'NULL' order by tp.exceutionDate";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader

            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            while (dr.Read())
            {   // Read till the end of the data into a row
                TotalTasksPer TP = new TotalTasksPer();
                TP.TaskName = (string)dr["TaskName"];
                TP.TaskTaskNo = (int)dr["TaskTaskNo"];
                TP.exceutionDate = (string)dr["exceutionDate"];
                TP.FromHour = (double)dr["FromHour"];
                TP.ToHour = (double)dr["ToHour"];
                TP.PersonEmpCode = (int)dr["PersonEmpCode"];
                TP.EmpFirstName = (string)dr["EmpFirstName"];
                TP.EmpLastName = (string)dr["EmpLastName"];

                TPlist.Add(TP);
            }

            return TPlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    // נועד לדוח השעות הכולל של כל המתנדבים/ פעילים באגודה ומביא לנו את כל המשימות בתוך אירוע
    public List<TotalTasksInEventPer> GetTotalTasksInEventPer()
    {
        List<TotalTasksInEventPer> TPlist = new List<TotalTasksInEventPer>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select * from Person_plan_TasksInEvent ppt inner join Task t on ppt.plan_TasksInEventTaskTaskNo= t.TaskNo inner join person p on ppt.PersonEmpCode=p.EmpCode where t.TaskName!= 'NULL' order by ppt.executionDate";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader

            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            while (dr.Read())
            {   // Read till the end of the data into a row
                TotalTasksInEventPer TP = new TotalTasksInEventPer();
                TP.TaskName = (string)dr["TaskName"];
                TP.executionDate = (string)dr["executionDate"];
                TP.plan_TasksInEventActual_EventBarcode = (int)dr["plan_TasksInEventActual_EventBarcode"];
                TP.FromHour = (double)dr["FromHour"];
                TP.ToHour = (double)dr["ToHour"];
                TP.PersonEmpCode = (int)dr["PersonEmpCode"];
                TP.EmpFirstName = (string)dr["EmpFirstName"];
                TP.EmpLastName = (string)dr["EmpLastName"];
                TP.plan_TasksInEventTaskTaskNo = (int)dr["plan_TasksInEventTaskTaskNo"];
                TPlist.Add(TP);
            }

            return TPlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }


    // הפונקציה קוראת מטבלת משימות בפועל ( שמשוייכות לאירוע) לפי תאריך התחלה ותאריך סיום ספציפיים

    public List<TasksInEventHoursRep> GetTasksInEventHoursRep(string FromDate, string ToDate)
    {
        List<TasksInEventHoursRep> TasksInEventHoursRep = new List<TasksInEventHoursRep>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = @" select ppt.PersonEmpCode, sum(ppt.ToHour-ppt.FromHour) as TotalTasksInEventHours, p.EmpFirstName, p.EmpLastName, d.DepartmentName
  from Person_plan_TasksInEvent ppt inner join Person p on ppt.PersonEmpCode=p.EmpCode inner join Departmnet d on p.DepartmnetDepartmentCode= d.DepartmentCode
  where ppt.executionDate>= '" + FromDate + "' and ppt.executionDate <= '" + ToDate + "' group by ppt.PersonEmpCode, p.EmpFirstName, p.EmpLastName, d.DepartmentName";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                TasksInEventHoursRep f = new TasksInEventHoursRep();

                f.PersonEmpCode = (int)dr["PersonEmpCode"];
                f.TotalTasksInEventHours = (double)dr["TotalTasksInEventHours"];
                f.EmpFirstName = (string)dr["EmpFirstName"];
                f.EmpLastName = (string)dr["EmpLastName"];
                f.DepartmentName = (string)dr["DepartmentName"];

                TasksInEventHoursRep.Add(f);
            }

            return TasksInEventHoursRep;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    // הפונקציה קוראת מטבלת משימות בפועל (שלא משוייכות לאירוע) לפי תאריך התחלה ותאריך סיום ספציפיים

    public List<TasksHoursRep> GetTasksHoursRep(string FromDate, string ToDate)
    {
        List<TasksHoursRep> TasksHoursRep = new List<TasksHoursRep>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = @" select tp.PersonEmpCode, sum(tp.ToHour-tp.FromHour) as TotalTasksHours, p.EmpFirstName, p.EmpLastName, d.DepartmentName
  from Task_Person tp inner join Person p on tp.PersonEmpCode=p.EmpCode inner join Departmnet d on p.DepartmnetDepartmentCode= d.DepartmentCode
  where tp.exceutionDate>= '" + FromDate + "' and tp.exceutionDate <= '" + ToDate + "' group by tp.PersonEmpCode, p.EmpFirstName, p.EmpLastName, d.DepartmentName";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                TasksHoursRep f = new TasksHoursRep();

                f.PersonEmpCode = (int)dr["PersonEmpCode"];
                f.TotalTasksHours = (double)dr["TotalTasksHours"];
                f.EmpFirstName = (string)dr["EmpFirstName"];
                f.EmpLastName = (string)dr["EmpLastName"];
                f.DepartmentName = (string)dr["DepartmentName"];

                TasksHoursRep.Add(f);
            }

            return TasksHoursRep;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }
        }
    }

}
