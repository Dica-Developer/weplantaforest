package org.dicadeveloper.weplantaforest.payment;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpHost;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.DefaultProxyRoutePlanner;
import org.apache.http.message.BasicNameValuePair;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import lombok.val;

@Component
public class PaymentHelper {

    protected final Log LOG = LogFactory.getLog(PaymentHelper.class.getName());

    @Autowired
    private Environment _env;

    public static final String DEFAULT_ENCODING = "UTF8";

    private final static DecimalFormat priceFormat = new DecimalFormat("#0.00");

    private final static String CONNECTION_ERROR = "connection_error";

    private final static String UNDEFINED_ERROR = "Es ist ein Fehler aufgetreten. Bitte Versuchen Sie es erneut.";

    public static Map<String, String> BANK_ERRORS = new HashMap<String, String>();

    static {
        BANK_ERRORS.put("BANK_100", "BANK_NO_API");
        BANK_ERRORS.put("BANK_101", "BANK_NO_FIRSTNAME");
        BANK_ERRORS.put("BANK_102", "BANK_NO_NAME");
        BANK_ERRORS.put("BANK_103", "BANK_NO_STREET");
        BANK_ERRORS.put("BANK_104", "BANK_NO_COUNTRY");
        BANK_ERRORS.put("BANK_105", "BANK_NO_CITY");
        BANK_ERRORS.put("BANK_106", "BANK_NO_ZIP");
        BANK_ERRORS.put("BANK_107", "BANK_NO_MAIL");
        BANK_ERRORS.put("BANK_108", "BANK_NO_VALUE");
        BANK_ERRORS.put("BANK_109", "BANK_NO_USAGE");
        BANK_ERRORS.put("BANK_110", "BANK_NO_QUITTUNG");
        BANK_ERRORS.put("BANK_111", "BANK_NO_PAYMENT_TYPE");
        BANK_ERRORS.put("BANK_112", "BANK_NO_SALUTATION");
        BANK_ERRORS.put("BANK_201", "BANK_NO_CC_OWNER");
        BANK_ERRORS.put("BANK_202", "BANK_NO_CC_NR");
        BANK_ERRORS.put("BANK_203", "BANK_NO_CC_DATE");
        BANK_ERRORS.put("BANK_204", "BANK_NO_CC_DATE");
        BANK_ERRORS.put("BANK_205", "BANK_NO_SECURITY_NUMBER");
        BANK_ERRORS.put("BANK_206", "BANK_NO_CC_TYPE");
        BANK_ERRORS.put("BANK_401", "BANK_INVALID_IBAN");
        BANK_ERRORS.put("BANK_402", "BANK_INVALID_BIC");
        BANK_ERRORS.put("BANK_500", "BANK_UNKNOWN_ERROR");
        BANK_ERRORS.put("BANK_501", "BANK_UNKNOWN_EMITTER");
        BANK_ERRORS.put("BANK_502", "BANK_INVALID_HASH");
        BANK_ERRORS.put("BANK_503", "BANK_CUSTOMER_NOT_FOUND");
        BANK_ERRORS.put("BANK_504", "BANK_INVALID_PARAM_FORMAT");
        BANK_ERRORS.put("BANK_506", "BANK_UNKNOWN_TRANSACTION_TYPE");
        BANK_ERRORS.put("BANK_507", "BANK_INVALID_ACCOUNT");
        BANK_ERRORS.put("BANK_508", "BANK_ACCOUNT_NR_TOO_LONG");
        BANK_ERRORS.put("BANK_509", "BANK_ACCOUNT_NR_TOO_SHORT");
        BANK_ERRORS.put("BANK_985", "BANK_DOUBLED_DONATION");
        BANK_ERRORS.put("BANK_984", "BANK_CC_DENIED");
    }

    public String postRequestSepa(Cart cart, PaymentData paymentData) {
        HttpClientBuilder httpClientBuilder;
        // on staging and production the requests has to be routed
        // through a proxy
        if (_env.getProperty("proxy.host") != null) {
            val proxy = new HttpHost(_env.getProperty("proxy.host"), Integer.parseInt(_env.getProperty("proxy.port")));
            val routePlanner = new DefaultProxyRoutePlanner(proxy);
            httpClientBuilder = HttpClients.custom().setRoutePlanner(routePlanner);
        } else {
            httpClientBuilder = HttpClients.custom();
        }
        val address = _env.getProperty("bfs.url");
        try (val httpClient = httpClientBuilder.build()) {
            HttpPost httpPost = new HttpPost(address);

            List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
            Map<String, String> params = createParams(cart, paymentData);
            for (Entry<String, String> entry : params.entrySet()) {
                urlParameters.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }

            httpPost.setEntity(new UrlEncodedFormEntity(urlParameters, "utf-8"));

            val response = httpClient.execute(httpPost);

            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuffer result = new StringBuffer();
            String line = "";
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }
            return result.toString();
        } catch (final Exception e) {
            LOG.error("unable to do post request to '" + address + "'", e);
            return CONNECTION_ERROR;
        }
    }

    public boolean isSuccessFull(String result) {
        return result != null && result.contains("status%3dsuccess");
    }

    public boolean isConnectionError(String result) {
        return result != null && result.equals(CONNECTION_ERROR);
    }

    public boolean isUndefinedError(String result) {
        return result != null && result.equals(UNDEFINED_ERROR);
    }

    public String getErrorCode(String response) {
        return response.substring(response.indexOf("%26code%3d") + 10, response.indexOf("%26code%3d") + 13);
    }

    private Map<String, String> createParams(Cart cart, PaymentData paymentData) {
        Map<String, String> params = new HashMap<>();

        // mandatory parameters
        params.put("charset", DEFAULT_ENCODING);
        params.put("oid", _env.getProperty("bfs.oid"));

        String formattedPrice = priceFormat.format(cart.getTotalPrice().doubleValue()).toString();
        formattedPrice = formattedPrice.replace(",", ".");
        params.put("betrag", formattedPrice);

        params.put("anrede", paymentData.getSalutation());
        params.put("vorname", paymentData.getForename());
        params.put("nachname", paymentData.getName());
        params.put("strasse", paymentData.getStreet());
        params.put("land", paymentData.getCountry());
        params.put("ort", paymentData.getCity());
        params.put("plz", paymentData.getZip());
        params.put("email", paymentData.getMail());

        params.put("verwendungszweck", "Spende I Plant A Tree (" + cart.getId() + ")");
        params.put("quittung", paymentData.getReceipt());
        params.put("zahlungsart", paymentData.getPaymentMethod());
        params.put("sepa_data[iban]", paymentData.getIban());
        params.put("sepa_data[bic]", paymentData.getBic());

        // optional parameters
        params.put("ret_success_url", Uris.PAYMENT_SUCCESS);
        params.put("ret_error_url", Uris.PAYMENT_ERROR);
        params.put("trackingcode", "Cart-ID: " + cart.getId());

        if (null != paymentData.getCompany() && !paymentData.getCompany().isEmpty()) {
            params.put("firma", paymentData.getCompany());
        }
        if (null != paymentData.getCompanyAddon() && !paymentData.getCompanyAddon().isEmpty()) {
            params.put("firma_zusatz", paymentData.getCompanyAddon());
        }
        if (null != paymentData.getComment() && !paymentData.getComment().isEmpty()) {
            params.put("kommentar", paymentData.getComment());
        }

        return params;
    }

}
