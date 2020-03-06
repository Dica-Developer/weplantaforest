package org.dicadeveloper.weplantaforest.payment;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.DefaultProxyRoutePlanner;
import org.apache.http.message.BasicNameValuePair;
import org.dicadeveloper.weplantaforest.cart.Cart;
import org.dicadeveloper.weplantaforest.support.Uris;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import lombok.NonNull;

@Component
public class PaymentHelper {

    protected final Log LOG = LogFactory.getLog(PaymentHelper.class.getName());

    @Autowired
    @NonNull
    private Environment _env;

    public static final String DEFAULT_ENCODING = "UTF-8";

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
        String address = _env.getProperty("bfs.url");
        try {
            CloseableHttpClient httpClient;
            // on staging and production the requests has to be routed
            // through a proxy
            if (_env.getProperty("proxy.host") != null) {
                HttpHost proxy = new HttpHost(_env.getProperty("proxy.host"), Integer.parseInt(_env.getProperty("proxy.port")));
                DefaultProxyRoutePlanner routePlanner = new DefaultProxyRoutePlanner(proxy);
                httpClient = HttpClients.custom().setRoutePlanner(routePlanner).build();
            } else {
                httpClient = HttpClients.custom().build();
            }

            HttpPost httpPost = new HttpPost(address);

            List<NameValuePair> urlParameters = new ArrayList<NameValuePair>();
            Map<String, String> params = createParams(cart, paymentData);
            for (Entry<String, String> entry : params.entrySet()) {
                urlParameters.add(new BasicNameValuePair(entry.getKey(), entry.getValue()));
            }

            httpPost.setEntity(new UrlEncodedFormEntity(urlParameters));

            HttpResponse response = httpClient.execute(httpPost);

            BufferedReader rd = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuffer result = new StringBuffer();
            String line = "";
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }
            httpClient.close();
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
        try {
            params.put("betrag", URLEncoder.encode(formattedPrice, DEFAULT_ENCODING));

            params.put("anrede", URLEncoder.encode(paymentData.getSalutation(), DEFAULT_ENCODING));
            params.put("vorname", URLEncoder.encode(paymentData.getForename(), DEFAULT_ENCODING));
            params.put("nachname", URLEncoder.encode(paymentData.getName(), DEFAULT_ENCODING));
            params.put("strasse", URLEncoder.encode(paymentData.getStreet(), DEFAULT_ENCODING));
            params.put("land", URLEncoder.encode(paymentData.getCountry(), DEFAULT_ENCODING));
            params.put("ort", URLEncoder.encode(paymentData.getCity(), DEFAULT_ENCODING));
            params.put("plz", URLEncoder.encode(paymentData.getZip(), DEFAULT_ENCODING));
            params.put("email", URLEncoder.encode(paymentData.getMail(), DEFAULT_ENCODING));

            params.put("verwendungszweck", "Spende I Plant A Tree");
            params.put("quittung", URLEncoder.encode(paymentData.getReceipt(), DEFAULT_ENCODING));
            params.put("zahlungsart", URLEncoder.encode(paymentData.getPaymentMethod(), DEFAULT_ENCODING));
            params.put("sepa_data[iban]", URLEncoder.encode(paymentData.getIban(), DEFAULT_ENCODING));
            params.put("sepa_data[bic]", URLEncoder.encode(paymentData.getBic(), DEFAULT_ENCODING));

            // optional parameters
            params.put("ret_success_url", Uris.PAYMENT_SUCCESS);
            params.put("ret_error_url", Uris.PAYMENT_ERROR);
            params.put("trackingcode", "Cart-ID: " + cart.getId());

            if (null != paymentData.getCompany() && !paymentData.getCompany().isEmpty()) {
                params.put("firma", URLEncoder.encode(paymentData.getCompany(), DEFAULT_ENCODING));
            }
            if (null != paymentData.getCompanyAddon() && !paymentData.getCompanyAddon().isEmpty()) {
                params.put("firma_zusatz", URLEncoder.encode(paymentData.getCompanyAddon(), DEFAULT_ENCODING));
            }
            if (null != paymentData.getComment() && !paymentData.getComment().isEmpty()) {
                params.put("kommentar", URLEncoder.encode(paymentData.getComment(), DEFAULT_ENCODING));
            }

        } catch (UnsupportedEncodingException e) {
            LOG.error("Error on payment via sepa.", e);
        }

        return params;
    }

}
