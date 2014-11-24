KnockoutPager
=============
By No means a finished product! 
Extends KnockoutJS ObservableArray
Adds properties:
pageSize, start, pages, isPaged, and currentIndex.
In addition adds computed observables currentPage and pagedData as well as methods
Next, Back, and SetPage.

Binding may look like this if array is named "sizes"
&lt;table&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th&gt;Culture&lt;/th&gt;
                        &lt;th&gt;Sex&lt;/th&gt;
                        &lt;th&gt;Size&lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;
                &lt;tbody data-bind=&quot;foreach: sizes.pagedData()&quot;&gt;
                    &lt;tr&gt;
                        &lt;td data-bind=&quot;text: culture.name&quot;&gt;&lt;/td&gt;
                        &lt;td data-bind=&quot;text: sex.name&quot;&gt;&lt;/td&gt;
                        &lt;td data-bind=&quot;text: size&quot;&gt;&lt;/td&gt;
                    &lt;/tr&gt;
                &lt;/tbody&gt;
                &lt;tfoot&gt;
                    &lt;tr&gt;
                        &lt;td&gt;
                            &lt;a data-bind=&quot;click: sizes.Next(), attr:{href:&#39;#&#39;}&quot;&gt;Next&lt;/a&gt;
                        &lt;/td&gt;
                        &lt;td&gt;
                            &lt;a data-bind=&quot;click: sizes.Back(), attr:{href:&#39;#&#39;}&quot;&gt;Back&lt;/a&gt;
                        &lt;/td&gt;
                    &lt;/tr&gt;
                &lt;/tfoot&gt;
            &lt;/table&gt;