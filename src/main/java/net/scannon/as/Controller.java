package net.scannon.as;

import net.scannon.as.database.adapter.DatabaseAdapter;
import net.scannon.as.database.adapter.implementation.MetricAdapter;
import net.scannon.as.database.adapter.implementation.SequenceAdapter;
import net.scannon.as.database.adapter.implementation.StatisticAdapter;
import net.scannon.as.database.adapter.implementation.UsersAdapter;
import net.scannon.as.inerfaces.JSONElement;
import net.scannon.as.objects.Metric;
import net.scannon.as.objects.Statistic;
import net.scannon.as.objects.User;
import net.scannon.as.security.AppConfig;
import net.scannon.as.utils.Utils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class Controller {

    private UsersAdapter usersAdapter = new UsersAdapter();
    private StatisticAdapter statisticAdapter = new StatisticAdapter();
    private MetricAdapter metricAdapter = new MetricAdapter();
    private SequenceAdapter sequenceAdapter = new SequenceAdapter();

    @Autowired
    AppConfig appConfig;


    @GetMapping("/test")
    public String Testweb(HttpServletRequest request) {
        return "test";
    }

    @GetMapping("/")
    public String main() {
        return ".";
    }


    @GetMapping("/{name}/{password}")
    public String getUserKey(@PathVariable(value = "name") String name, @PathVariable(value = "password") String password) {
        String key = usersAdapter.getUserKey(name, password);

        if (key == null) {
            key = usersAdapter.getUserKey(name, password);
        }

        return key;
    }


    @PostMapping("/metrics")
    public boolean pushMetrics(@RequestBody String body) {
        JSONObject json = new JSONObject(body);
        JSONArray array = json.getJSONArray("array");
        List<Metric> metrics = new ArrayList<>();

        for (int i = 0; i < array.length(); i++) {
            JSONObject jsonMetric = array.getJSONObject(i);
            Metric metric = new Metric(jsonMetric);
            metrics.add(metric);
        }

        metricAdapter.pushMetrics(metrics);

        return true;
    }

    @PostMapping("/sequence")
    public boolean pushSequence(@RequestBody String body) {
        JSONObject json = new JSONObject(body);
        return sequenceAdapter.insertSequence(json);
    }

    @GetMapping("/levels/{id}")
    public String getLevelByID(@PathVariable(value = "id") int id) {
        JSONObject json = sequenceAdapter.getLevelByID(id);
        return json.toString();
    }

    @GetMapping("/sequences/{id}")
    public String getSequenceByID(@PathVariable(value = "id") int id) {
        JSONObject json = sequenceAdapter.getSequenceByID(id);
        return json.toString();
    }

    @GetMapping("/groups")
    public String getGroups() {
        JSONObject array = sequenceAdapter.getGroups();
        return array.toString();
    }

    @GetMapping("/groups/{id}")
    public String getGroups(@PathVariable(value = "id") int id) {
        JSONObject array = sequenceAdapter.getGroup(id);
        return array.toString();
    }

    @GetMapping("/{token}")
    public String getUserByToken(@PathVariable(value = "token") String token) {
        JSONObject json = usersAdapter.getUserByKey(token);
        return json.toString();
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        String password = body.get("password");

        if (!usersAdapter.createUser(name, password)) {
            String key = usersAdapter.getUserKey(name, password);

            if (key == null) {
                key = usersAdapter.getUserKey(name, password);
            }

            return "{\"token\":\"" + key + "\"}";
        }

        String key = usersAdapter.generateUserKey(name, password);
        return "{\"token\":\"" + key + "\"}";
    }

    @PostMapping("/users/{name}")
    public boolean setStatistic(@PathVariable(value = "name") String name, @RequestBody String body, @RequestHeader(name = "name") String token) {

        if (!name.equals(token)) {
            return false;
        }

        JSONObject json = new JSONObject(body);


        User user = usersAdapter.getUserInfo(name);

        json.keySet().forEach(k -> {
            String val = json.getString(k);
            JSONObject object = new JSONObject(val);
            statisticAdapter.getStatistic(user.getId(), object.getInt("id"));
            statisticAdapter.setStatistics(new Statistic(user.getId(), object.getInt("id"), object.getInt("pos"), object.getInt("neg")));
        });

        return true;
    }

    @GetMapping("/users/{name}/statistics")
    public String getUserStatistic(@PathVariable(value = "name") String name, @RequestHeader(name = "name") String token) {
        if (!name.equals(token)) {
            return null;
        }

        User user = usersAdapter.getUserInfo(name);
        List<JSONElement> statistics = statisticAdapter.getAllStatisticsForUser(user.getId());

        return Utils.listToJSON(statistics);
    }

    @GetMapping("/users/{name}")
    public String getUser(@PathVariable(value = "name") String name, @RequestHeader(name = "name") String token) {
        if (!name.equals(token)) {
            return null;
        }

        return usersAdapter.getUserInfo(name).toJSON();
    }


}
