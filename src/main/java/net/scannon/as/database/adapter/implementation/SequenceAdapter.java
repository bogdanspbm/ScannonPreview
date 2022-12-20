package net.scannon.as.database.adapter.implementation;

import net.scannon.as.database.adapter.DatabaseAdapter;
import net.scannon.as.objects.Metric;
import org.json.JSONArray;
import org.json.JSONObject;

import java.sql.*;

public class SequenceAdapter extends DatabaseAdapter {

    public SequenceAdapter() {
        super();
        tableName = "sequence";
    }

    public boolean insertSequence(JSONObject object) {
        Connection connection = database.getConnection();

        try (Statement statement = connection.createStatement()) {
            String query = "INSERT INTO " + tableName + " (expressions) VALUES ('" + object.toString() + "');";
            return statement.execute(query);
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return false;
    }

    public JSONObject getSequenceByID(int id) {

        Connection connection = database.getConnection();

        try (Statement statement = connection.createStatement()) {
            String query = "SELECT * FROM " + tableName + " WHERE id = " + id + ";";

            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                String expressions = resultSet.getString("expressions");
                JSONObject object = new JSONObject(expressions);
                object.put("id", id);
                return object;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return new JSONObject();
    }

    public JSONObject getLevelByID(int id) {
        Connection connection = database.getConnection();

        try (Statement statement = connection.createStatement()) {
            String query = "SELECT * FROM level WHERE id = " + id + ";";

            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                String name = resultSet.getString("name");
                String icon = resultSet.getString("icon");
                Array array = resultSet.getArray("sequences");

                JSONObject object = new JSONObject();
                object.put("id", id);
                object.put("name", name);
                object.put("icon", icon);
                object.put("sequences", array);

                return object;
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }

        return new JSONObject();
    }

    public JSONObject getGroups() {

        JSONArray result = new JSONArray();
        Connection connection = database.getConnection();

        try (Statement statement = connection.createStatement()) {
            String query = "SELECT * FROM \"group\";";

            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                String icon = resultSet.getString("icon");
                Array array = resultSet.getArray("levels");

                JSONObject object = new JSONObject();
                object.put("id", id);
                object.put("name", name);
                object.put("icon", icon);
                object.put("levels", array);

                result.put(object);
            }

        } catch (SQLException e) {
            System.out.println(e.getStackTrace());
        }

        JSONObject out = new JSONObject();
        out.put("array", result);
        return out;
    }

    public JSONObject getGroup(int id) {

        Connection connection = database.getConnection();

        try (Statement statement = connection.createStatement()) {
            String query = "SELECT * FROM \"group\" WHERE id = " + id + ";";

            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                String name = resultSet.getString("name");
                String icon = resultSet.getString("icon");
                Array array = resultSet.getArray("levels");

                JSONObject object = new JSONObject();
                object.put("id", id);
                object.put("name", name);
                object.put("icon", icon);
                object.put("levels", array);

                return object;
            }

        } catch (SQLException e) {
            System.out.println(e.getStackTrace());
        }

        return new JSONObject();
    }

}
