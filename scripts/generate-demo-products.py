import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# category_id: [(name, price, image_url), ...]
DEMO_BY_CATEGORY = {
    1: [
        ("Zarif Midi Elbise", 899.99, "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80"),
        ("Gece Elbisesi Siyah", 1299.0, "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80"),
        ("Çiçek Desenli Elbise", 749.5, "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80"),
        ("Günlük Triko Elbise", 599.0, "https://images.unsplash.com/photo-1572804013309-59a686b1cf0a?w=600&q=80"),
    ],
    2: [
        ("İpek Bluz Beyaz", 449.99, "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80"),
        ("Oversize Gömlek Mavi", 389.0, "https://images.unsplash.com/photo-1596755094514-f87e34085b56?w=600&q=80"),
        ("Saten Bluz Pudra", 529.0, "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80"),
        ("Klasik Poplin Gömlek", 359.99, "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80"),
    ],
    3: [
        ("Yüksek Bel Pantolon", 499.0, "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&q=80"),
        ("Wide Leg Pantolon", 549.99, "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80"),
        ("Kumaş Palazzo", 429.0, "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80"),
        ("Slim Fit Pantolon", 479.0, "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80"),
    ],
    4: [
        ("Pileli Midi Etek", 349.99, "https://images.unsplash.com/photo-1583498273704-9450b543e0a1?w=600&q=80"),
        ("Deri Mini Etek", 599.0, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"),
        ("Kalem Etek Siyah", 299.0, "https://images.unsplash.com/photo-1582555172862-f73ad44be088?w=600&q=80"),
        ("Desenli Maxi Etek", 419.0, "https://images.unsplash.com/photo-1551489186-cf8726f514f8?w=600&q=80"),
    ],
    5: [
        ("Deri Omuz Çantası", 899.99, "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80"),
        ("Mini Sırt Çantası", 649.5, "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"),
        ("Tote Çanta Bej", 549.0, "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80"),
        ("Zincir Askılı Çanta", 799.0, "https://images.unsplash.com/photo-1564422170194-896b89110ef8?w=600&q=80"),
    ],
    6: [
        ("Beyaz Sneaker", 899.0, "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80"),
        ("Topuklu Ayakkabı", 749.99, "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80"),
        ("Bot Deri Siyah", 1099.0, "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80"),
        ("Loafer Kahverengi", 649.0, "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80"),
    ],
    7: [
        ("Basic Beyaz T-Shirt", 199.99, "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"),
        ("Oversize Siyah Tişört", 249.0, "https://images.unsplash.com/photo-1583743814966-c6a40d16308c?w=600&q=80"),
        ("Baskılı T-Shirt", 279.0, "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80"),
        ("V Yaka Pamuklu Tişört", 219.99, "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80"),
    ],
    8: [
        ("Oxford Gömlek Mavi", 449.0, "https://images.unsplash.com/photo-1596755094514-f87e34085b56?w=600&q=80"),
        ("Keten Gömlek Beyaz", 499.99, "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80"),
        ("Ekose Gömlek", 429.0, "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80"),
        ("Slim Fit Gömlek Gri", 389.0, "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&q=80"),
    ],
    9: [
        ("Chino Pantolon Bej", 549.0, "https://images.unsplash.com/photo-1473966968600-fa801b279a0a?w=600&q=80"),
        ("Slim Fit Jean", 599.99, "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80"),
        ("Kargo Pantolon", 649.0, "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80"),
        ("Klasik Kumaş Pantolon", 499.0, "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80"),
    ],
    10: [
        ("Blazer Ceket Lacivert", 1299.0, "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80"),
        ("Deri Ceket Siyah", 2499.99, "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80"),
        ("Bomber Ceket", 899.0, "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"),
        ("Keten Blazer", 1099.0, "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80"),
    ],
    11: [
        ("Klasik Kol Saati", 1299.0, "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80"),
        ("Spor Kronograf Saat", 1599.99, "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"),
        ("Deri Kayış Saat", 999.0, "https://images.unsplash.com/photo-1524805445258-039964592060?w=600&q=80"),
        ("Minimalist Saat", 849.0, "https://images.unsplash.com/photo-1533139502658-019a74a261de?w=600&q=80"),
    ],
    12: [
        ("Erkek Sneaker Beyaz", 899.99, "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80"),
        ("Deri Oxford Ayakkabı", 1199.0, "https://images.unsplash.com/photo-1614252238916-862a6a3c7a8a?w=600&q=80"),
        ("Bot Chelsea", 1399.0, "https://images.unsplash.com/photo-1608256246200-53bd35fbcb9b?w=600&q=80"),
        ("Günlük Loafer", 749.0, "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80"),
    ],
}

products = []
pid = 9001
for cat_id, items in DEMO_BY_CATEGORY.items():
    for i, (name, price, img) in enumerate(items):
        products.append({
            "id": pid,
            "name": name,
            "description": f"{name} - Bandage koleksiyonu.",
            "price": price,
            "stock": 20 + i * 5,
            "store_id": 1,
            "category_id": cat_id,
            "rating": round(3.5 + (i * 0.3), 2),
            "sell_count": 10 + i * 7,
            "images": [{"url": img, "index": 0}],
        })
        pid += 1

out = {"products": products}
public_path = os.path.join(ROOT, "public", "data", "demo-products.json")
os.makedirs(os.path.dirname(public_path), exist_ok=True)
with open(public_path, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

seed_path = os.path.join(ROOT, "server", "seed-data.json")
with open(seed_path, encoding="utf-8") as f:
    seed = json.load(f)

existing_ids = {p["id"] for p in seed["products"]}
seed["products"] = [p for p in seed["products"] if p["id"] < 9000]
seed["products"].extend(products)

with open(seed_path, "w", encoding="utf-8") as f:
    json.dump(seed, f, ensure_ascii=False, indent=2)

print(f"Wrote {len(products)} demo products to public + seed")
